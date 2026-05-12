import express from "express";
import * as cheerio from "cheerio";

const app = express();
const PORT = process.env.PORT || 3000;

let requestCount = 0;

// Middleware para configurar os cabeçalhos de CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
    // Permite requisições de qualquer origem
    res.header("Access-Control-Allow-Origin", "*");
    // Define os métodos HTTP permitidos
    res.header("Access-Control-Allow-Methods", "GET,OPTIONS");
    // Define os cabeçalhos permitidos nas requisições
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept",
    );

    next();
});

// Rota para lidar com requisições prévias (preflight) do tipo OPTIONS
app.options("/api/nfce", (req, res) => {
    // Retorna status 204 (No Content) indicando que a requisição é permitida
    res.sendStatus(204);
});

app.get("/api/nfce", async (req, res) => {
    const p = req.query.p;
    requestCount++;
    console.log(`Request #${requestCount} - Parameter p: ${p}`);

    if (!p || typeof p !== "string") {
        return res.status(400).json({ error: "Query parameter p is required" });
    }

    try {
        const targetUrl = `https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx?p=${encodeURIComponent(p)}`;

        const response = await fetch(targetUrl, {
            headers: {
                // Define um User-Agent de navegador comum para evitar bloqueios simples
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
                // Indica os tipos de conteúdo aceitos na resposta
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                // Define a preferência de idioma
                "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            },
            // Instrução para seguir redirecionamentos automáticos
            redirect: "follow",
        });

        // Extrai o conteúdo HTML da resposta
        const html = await response.text();

        // Verifica se a resposta da SEFAZ foi bem-sucedida (status 200-299)
        if (!response.ok) {
            return res.status(response.status).json({
                error: "Falha ao buscar SEFAZ",
                status: response.status,
                body: html,
            });
        }

        // Carrega o HTML no Cheerio para facilitar a busca de elementos (similar ao jQuery)
        const $ = cheerio.load(html);

        // Busca os dados necessários usando seletores CSS e extrai o texto, removendo espaços extras
        const storeName = $("div#u20").text().trim();
        const tributes = parseFloat(
            $("span.txtObs").text().trim().replace(",", "."),
        );
        const totalValue = parseFloat(
            $("span.txtMax").text().trim().replace(",", "."),
        );

        const stringWithDate = $('h4:contains("Informações gerais da Nota")')
            .next("ul")
            .find("li")
            .text();
        // Usando Regex para extrair apenas a data (DD/MM/AAAA)
        const purchaseDate = stringWithDate.match(/\d{2}\/\d{2}\/\d{4}/)[0];

        // Retorna o valor dos tributos como um objeto JSON
        return res.json({ storeName, totalValue, tributes, purchaseDate });
    } catch (error) {
        // Loga qualquer erro ocorrido no console do servidor
        console.error(error);
        // Retorna erro 500 (Internal Server Error) em caso de falha na execução
        return res.status(500).json({ error: "Erro interno ao buscar NFC-e" });
    }
});

// Inicia o servidor na porta configurada e exibe uma mensagem no log
app.listen(PORT, () => {
    console.log(`API server listening on http://localhost:${PORT}`);
});

const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
            headers: { 'Content-Type': 'application/json', 'Allow': 'POST' }
        };
    }

    try {
        const { name, email, message } = JSON.parse(event.body);

        if (!name || !email || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Bad Request: Missing name, email, or message.' }),
                headers: { 'Content-Type': 'application/json' }
            };
        }

        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) {
            console.error('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set in environment variables.');
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Server configuration error.' }),
                headers: { 'Content-Type': 'application/json' }
            };
        }

        const text = `Nuevo mensaje del formulario de contacto:\n\nNombre: ${name}\nEmail: ${email}\nMensaje: ${message}`;

        const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

        const response = await fetch(telegramApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: text
            })
        });

        const responseData = await response.json();

        if (!response.ok || !responseData.ok) {
            console.error('Error sending message to Telegram:', responseData);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Failed to send message to Telegram.', error: responseData }),
                headers: { 'Content-Type': 'application/json' }
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Message sent successfully!' }),
            headers: { 'Content-Type': 'application/json' }
        };

    } catch (error) {
        console.error('Error processing request:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
};
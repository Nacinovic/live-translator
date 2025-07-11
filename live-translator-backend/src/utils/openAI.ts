import OpenAI from "openai";
import { ServerError } from "../errors";

const apiKey = process.env.CHAT_GTP_API_KEY

if (!apiKey) {
    throw new ServerError("Missing env variables")
}

const openai = new OpenAI({
    apiKey,
    maxRetries: 3
});

async function translateMessage(message: string, desiredLanguage: string) {
    const instructions = `
    Your main purpose is to translate the user's message into ${desiredLanguage}. 
    The steps are:
    1. Detect the language of the message.
    2. If the language is not directly translatable to ${desiredLanguage}, 
    first translate it into English, and then translate the English message to ${desiredLanguage}.
    3. If this cannot be done, explain why the translation failed.
    4. Output should be only message in ${desiredLanguage}.
    5. If message or word in a message is not translatable, return it as it is.
    6. Never answer to questions, your task is only to translate !!!!\

    However, **DO NOT** include the steps or any other information in your response.
    Provide only the final translated text in ${desiredLanguage} and nothing else.
`;
    const response = await openai.chat.completions.create({
        model: "gpt-4",  // Choose the model
        messages: [
            { role: "system", content: instructions },
            { role: "user", content: message }
        ]
    });
    
    return response.choices[0].message.content;
}


export default translateMessage

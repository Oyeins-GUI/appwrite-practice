import { Client, Account, Databases } from "appwrite";

const client = new Client();

client
   .setEndpoint("https://cloud.appwrite.io/v1")
   .setProject("6534489446296cc4c6c7");

export const account = new Account(client);
export const databases = new Databases(client);


import * as dotenv from 'dotenv';
dotenv.config();

import { getTasks } from './functions.js';

export async function Clickup(props = {}) {

    const {apiKey} = props


    const data = await getTasks({listId: 900500459390, apiKey: apiKey})

    return data
}
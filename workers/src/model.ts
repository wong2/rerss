import {customAlphabet} from 'nanoid/async'
import {FeedType} from './consts'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 10)

async function getFeed(id: string): Promise<{
	source: string,
	type: FeedType,
	jsonData: unknown,
	createdAt: string
} | null> {
	return KV.get(`feed:${id}`, 'json')
}

async function createFeed(source: string, type: FeedType, jsonData: unknown):Promise<string> {
	const id = await nanoid()
	await KV.put(`feed:${id}`, JSON.stringify({
		source,
		type,
		jsonData,
		createdAt: new Date().toISOString()
	}))
	return id
}

export { getFeed, createFeed }
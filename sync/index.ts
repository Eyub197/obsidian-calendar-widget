import {
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
	region: "auto",
	endpoint: `${Bun.env.BUCKET_URL}`,
	credentials: {
		accessKeyId: `${Bun.env.ACCESS_KEY_ID}`,
		secretAccessKey: `${Bun.env.SECRET_ACCESS_KEY}`,
	},
});

const getUrl = await getSignedUrl(
	s3,
	new GetObjectCommand({
		Bucket: "obsidian-calendar-widget",
		Key: "README.md",
	}),
);

// await s3.send(
// 	new PutObjectCommand({
// 		Bucket: "obsidian-calendar-widget",
// 		Key: "README.md ",
// 		Body: "test",
// 	}),
// );
//

async function getOneEvent() {
	const path = "/home/eyub/Documents/Obsidian Vault/templates/calendar";
	const file = Bun.file(`${path}/uni/(Every M) uni.md`);
	const text = await file.text();
	const yaml = Bun.YAML.parse(text);
	const jsonString = JSON.stringify(yaml);
	await Bun.write("uniModay.json", jsonString);
}

getOneEvent();

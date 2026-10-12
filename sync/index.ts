import {
	S3Client,
	PutObjectCommand,
	GetObjectCommand,
	ListObjectsV2Command,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
	region: "auto",
	endpoint: `${Bun.env.BUCKET_URL}`,
	credentials: {
		accessKeyId: `${Bun.env.ACCESS_KEY_ID}`,
		secretAccessKey: `${Bun.env.SECRET_ACCESS_KEY}`,
	},
});

await s3.send(
	new PutObjectCommand({
		Bucket: "obsidian-calendar-widget",
		Key: "README.md ",
		Body: "test",
	}),
);

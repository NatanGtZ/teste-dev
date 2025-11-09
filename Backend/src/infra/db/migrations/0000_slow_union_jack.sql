CREATE TABLE "funcionario" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"cpf" text NOT NULL,
	"email" text NOT NULL,
	"tamanho_camiseta" text NOT NULL,
	"tamanho_calcado" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

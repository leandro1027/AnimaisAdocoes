/*
  Warnings:

  - You are about to drop the column `cpf` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `especie` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Adocao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "animalId" INTEGER NOT NULL,
    "adotante" TEXT NOT NULL,
    "dataAdocao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observacoes" TEXT,
    CONSTRAINT "Adocao_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Animal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "raca" TEXT,
    "idade" INTEGER,
    "descricao" TEXT,
    "adotado" BOOLEAN NOT NULL DEFAULT false,
    "usuarioId" INTEGER NOT NULL,
    CONSTRAINT "Animal_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Animal" ("id", "raca") SELECT "id", "raca" FROM "Animal";
DROP TABLE "Animal";
ALTER TABLE "new_Animal" RENAME TO "Animal";
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "endereco" TEXT
);
INSERT INTO "new_Usuario" ("email", "id", "nome") SELECT "email", "id", "nome" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Adocao_animalId_key" ON "Adocao"("animalId");

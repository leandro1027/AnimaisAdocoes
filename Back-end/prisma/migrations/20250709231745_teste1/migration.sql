/*
  Warnings:

  - You are about to drop the column `adotadoPorId` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `ja_adotou` on the `Usuario` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Animal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "raca" TEXT NOT NULL
);
INSERT INTO "new_Animal" ("id", "raca") SELECT "id", "raca" FROM "Animal";
DROP TABLE "Animal";
ALTER TABLE "new_Animal" RENAME TO "Animal";
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL
);
INSERT INTO "new_Usuario" ("cpf", "email", "id", "nome") SELECT "cpf", "email", "id", "nome" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

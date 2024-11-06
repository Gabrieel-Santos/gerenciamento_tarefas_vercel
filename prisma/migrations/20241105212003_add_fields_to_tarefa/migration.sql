/*
  Warnings:

  - You are about to drop the column `concluido` on the `Tarefa` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `Tarefa` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `Tarefa` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `Tarefa` table. All the data in the column will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[ordemApresentacao]` on the table `Tarefa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `custo` to the `Tarefa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataLimite` to the `Tarefa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Tarefa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ordemApresentacao` to the `Tarefa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tarefa" DROP CONSTRAINT "Tarefa_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Tarefa" DROP COLUMN "concluido",
DROP COLUMN "descricao",
DROP COLUMN "titulo",
DROP COLUMN "usuarioId",
ADD COLUMN     "custo" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "dataLimite" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "ordemApresentacao" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Usuario";

-- CreateIndex
CREATE UNIQUE INDEX "Tarefa_ordemApresentacao_key" ON "Tarefa"("ordemApresentacao");

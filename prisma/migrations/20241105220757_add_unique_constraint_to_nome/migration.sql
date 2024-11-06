/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Tarefa` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tarefa_nome_key" ON "Tarefa"("nome");

import { initSubscriptions } from "./index";

// Declaração global para o Node.js
declare global {
  // eslint-disable-next-line no-var
  var __DB_SUBSCRIPTIONS_INITIALIZED: boolean;
}

// Função para inicializar as subscrições apenas uma vez
export const initDatabaseSubscriptions = () => {
  if (global.__DB_SUBSCRIPTIONS_INITIALIZED !== true) {
    console.log("================= INIT ===============");
    console.log("Inicializando subscrições do banco de dados...");
    initSubscriptions();
    global.__DB_SUBSCRIPTIONS_INITIALIZED = true;
    console.log("Subscrições do banco de dados inicializadas com sucesso!");
  } else {
    console.log("Subscrições já inicializadas anteriormente, ignorando...");
  }
};

// Inicializa as subscrições imediatamente quando este módulo é importado
initDatabaseSubscriptions();

export default initDatabaseSubscriptions;

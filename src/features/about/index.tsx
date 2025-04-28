export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold">Sobre o Projeto</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Um sistema de gerenciamento de contatos desenvolvido para facilitar a
          organização pessoal e profissional de contatos.
        </p>
      </div>

      <div className="w-full max-w-4xl space-y-10">
        <div className="card bg-base-100 shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-2">Front-end</h2>
          <p className="mb-4">
            A aplicação foi criada utilizando <strong>React</strong> com{' '}
            <strong>Vite</strong>, estruturada em três módulos principais:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Core:</strong> Núcleo da aplicação contendo modelos,
              componentes universais, guards de rota, interceptadores, layouts,
              traduções, configurações e temas.
            </li>
            <li>
              <strong>Features:</strong> Funcionalidades que agregam valor, como
              telas de gerenciamento de contatos.
            </li>
            <li>
              <strong>Shared:</strong> Recursos compartilhados e reutilizáveis
              entre as features.
            </li>
          </ul>
          <p className="mt-4">
            Foram utilizadas bibliotecas como <strong>React Hook Form</strong> para gerenciamento de formulários, 
            <strong> Yup</strong> para validações e <strong>DaisyUI</strong> (com <strong>TailwindCSS</strong>) para estilização de componentes.
          </p>
          <div className="mt-4">
            <a
              href="https://github.com/yasminlopes/contacts-app"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver repositório
            </a>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-2">Back-end</h2>
          <p className="mb-4">
            A API, chamada <strong>Contacts API</strong>, foi desenvolvida
            usando <strong>Fastify</strong> e <strong>Prisma</strong>. Ela
            permite criar, atualizar, remover e buscar contatos em um banco de
            dados PostgreSQL hospedado na AWS.
          </p>
          <p className="mb-4">Tecnologias utilizadas:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Fastify para servidor HTTP</li>
            <li>Prisma como ORM</li>
            <li>Joi para validação de dados</li>
            <li>Hospedagem usando AWS EC2 e RDS</li>
          </ul>
          <div className="mt-4">
            <a
              href="https://github.com/yasminlopes/contacts-api"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver repositório
            </a>
          </div>
        </div>
      </div>

      <footer className="text-center pt-10">
        <p className="text-sm">Desenvolvido por Yasmin Lopes</p>
      </footer>
    </div>
  );
}

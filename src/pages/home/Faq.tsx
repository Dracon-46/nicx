import { Accordion, type AccordionItem } from '../../components/ui/Accordion';
import { Eyebrow, Reveal } from '../../components/ui/primitives';
import { PAGE_HREF } from '../../site';

const ITEMS: AccordionItem[] = [
  {
    q: 'O Nicx é gratuito?',
    a: (
      <>
        Sim, sem custo por uso. Não há mensalidade nem cobrança por pergunta, porque a IA roda no seu próprio
        computador, e não num servidor que alguém precisa pagar.
      </>
    ),
  },
  {
    q: 'Minhas conversas vão para algum servidor?',
    a: (
      <>
        Não. Conversas, arquivos, memórias e o áudio do microfone ficam no seu computador. Se você permitir, o Nicx
        envia apenas estatísticas anônimas de uso, nunca o conteúdo. Os detalhes estão na{' '}
        <a href={PAGE_HREF.privacy}>Política de privacidade</a>.
      </>
    ),
  },
  {
    q: 'Preciso estar conectado à internet?',
    a: (
      <>
        Só para instalar. Depois disso, conversa, voz e memória funcionam offline. A internet volta a ser usada
        apenas por ferramentas que dependem dela, como a busca na web, e sempre com a sua permissão.
      </>
    ),
  },
  {
    q: 'Funciona sem placa de vídeo? Por que a resposta demora?',
    a: (
      <>
        Funciona, sim: o Nicx usa o processador. A contrapartida é a velocidade. Em computadores mais simples, uma
        resposta pode levar algumas dezenas de segundos, e a primeira do dia demora um pouco mais, enquanto o modelo
        é carregado na memória. Com uma placa de vídeo dedicada, fica bem mais rápido.
      </>
    ),
  },
  {
    q: 'Quais modelos de IA ele usa?',
    a: (
      <>
        Modelos de linguagem abertos, que rodam localmente pelo Ollama. O padrão é o <strong>Qwen 3.5 (4B)</strong>,
        um bom equilíbrio entre qualidade e velocidade para computadores comuns. Em PCs com menos memória, o
        instalador escolhe um modelo menor, e você pode trocar quando quiser.
      </>
    ),
  },
  {
    q: 'O Nicx pode mexer no meu computador sozinho?',
    a: (
      <>
        Não. Ler arquivos, executar comandos ou acessar a internet são ferramentas, e toda ferramenta pede a sua
        confirmação antes, mostrando exatamente o que vai ser feito. A decisão é sempre sua.
      </>
    ),
  },
  {
    q: 'Ele entende e fala português de verdade?',
    a: (
      <>
        Sim. O Nicx foi feito para conversar em português do Brasil: a interface, as respostas e a voz, que é
        brasileira. O reconhecimento de fala também roda no seu computador.
      </>
    ),
  },
  {
    q: 'Como eu instalo?',
    a: (
      <>
        No Windows, baixe o <strong>NicxSetup.exe</strong> pelo botão <strong>Baixar para Windows</strong>: ele confere
        o seu computador e instala só o que falta. No Mac, é um comando no Terminal. Veja o{' '}
        <a href={PAGE_HREF.install}>passo a passo da instalação</a>.
      </>
    ),
  },
  {
    q: 'O Windows disse que “protegeu o computador”. E agora?',
    a: (
      <>
        O instalador ainda não tem assinatura digital, então o Windows SmartScreen avisa ao abrir. Se você baixou por
        este site, clique em <strong>Mais informações</strong> e depois em <strong>Executar assim mesmo</strong>.
      </>
    ),
  },
  {
    q: 'Como apago os dados que já foram enviados?',
    a: (
      <>
        No Nicx, vá em <strong>Configurações → Privacidade → Apagar meus dados</strong>. Isso exclui dos servidores
        da Falkyria todos os eventos da sua instalação e cria um novo identificador. Você também pode desligar o
        envio a qualquer momento.
      </>
    ),
  },
];

export function Faq() {
  return (
    <section id="duvidas" className="container-site pt-28 sm:pt-36" aria-labelledby="duvidas-titulo">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
        <Reveal className="flex flex-col items-start gap-4 lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>Dúvidas</Eyebrow>
          <h2
            id="duvidas-titulo"
            className="text-gradient text-[34px] leading-[1.06] font-semibold tracking-[-0.038em] text-balance sm:text-[44px]"
          >
            Perguntas frequentes.
          </h2>
          <p className="text-[17px] leading-relaxed text-muted">
            O que todo mundo pergunta antes de ter uma IA morando no próprio computador.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <Accordion items={ITEMS} />
        </Reveal>
      </div>
    </section>
  );
}

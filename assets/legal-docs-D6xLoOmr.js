import{an as e,d as t,in as n,m as r,p as i,r as a,rn as o,s}from"./primitives-DIJAizoT.js";import{n as c,t as l}from"./shield-check-DE4t546e.js";var u={title:`Política de Privacidade do Nicx`,version:`Versão 2026-10-23`,html:`<p>Esta política explica quais dados o <strong>Nicx</strong>, a inteligência artificial da
<strong>Falkyria</strong>, trata, por quê, e como você controla isso. Ela vale para o
programa de linha de comando, o app desktop e a interface no navegador.</p>
<h2 id="resumo">Resumo</h2>
<ul>
<li><strong>Suas conversas, arquivos e memórias ficam no seu computador.</strong> O Nicx roda
com modelos de IA locais e não envia esse conteúdo para a Falkyria.</li>
<li><strong>Estatísticas de uso só com a sua permissão.</strong> Se você aceitar, o Nicx envia
dados anônimos de uso (quais recursos você usa, tempos, erros), nunca o
conteúdo do que você escreve.</li>
<li><strong>Você manda.</strong> Pode recusar, mudar de ideia ou apagar o que já foi enviado a
qualquer momento.</li>
</ul>
<h2 id="1-quem-e-responsavel-pelos-dados">1. Quem é responsável pelos dados</h2>
<p>A <strong>Falkyria</strong> é a controladora dos dados descritos nesta política, nos termos
da Lei Geral de Proteção de Dados (Lei nº 13.709/2018, &quot;LGPD&quot;).</p>
<p>Contato para assuntos de privacidade: <strong><a href="mailto:arthurgaspare@gmail.com">arthurgaspare@gmail.com</a></strong>.</p>
<h2 id="2-o-que-fica-apenas-no-seu-computador">2. O que fica apenas no seu computador</h2>
<p>Tudo o que você faz no Nicx é processado e guardado localmente, na pasta de
dados do Nicx (por padrão <code>~/.nicx</code>):</p>
<ul>
<li>conversas, perguntas e respostas;</li>
<li>arquivos, documentos e memórias que você indexa;</li>
<li>áudio do microfone e voz sintetizada (o reconhecimento e a síntese de voz
rodam no seu computador);</li>
<li>histórico de uso, métricas de desempenho e de energia (telemetria local);</li>
<li>configurações e chaves de serviços que você conectar.</li>
</ul>
<p>A Falkyria não tem acesso a nada disso.</p>
<p>Algumas ferramentas, quando você as usa, acessam a internet por conta própria:
por exemplo, a busca na web consulta um mecanismo de busca e os conectores
(e-mail, agenda etc.) falam com os serviços que você autorizar. Esses acessos
seguem as políticas desses serviços e não passam pela Falkyria.</p>
<h2 id="3-o-que-enviamos-se-voce-permitir">3. O que enviamos se você permitir</h2>
<p>Com o seu consentimento, o Nicx envia à Falkyria <strong>estatísticas anônimas de
uso</strong>:</p>
<div class="prose-table"><table>
<thead>
<tr>
<th>Dado</th>
<th>Exemplo</th>
</tr>
</thead>
<tbody><tr>
<td>Eventos de uso</td>
<td>o app foi aberto; um recurso foi usado (voz, memória, ferramentas); uma sessão de conversa terminou</td>
</tr>
<tr>
<td>Contagens e tempos</td>
<td>número de mensagens, tokens, tempo de resposta, duração da sessão</td>
</tr>
<tr>
<td>Erros</td>
<td>apenas o tipo do erro (por exemplo, &quot;modelo não encontrado&quot;)</td>
</tr>
<tr>
<td>Instalação</td>
<td>etapas concluídas ou que falharam</td>
</tr>
<tr>
<td>Ambiente</td>
<td>versão do Nicx, sistema operacional, arquitetura do processador</td>
</tr>
<tr>
<td>Modelo</td>
<td>identificador do modelo transformado em código irreversível (hash)</td>
</tr>
<tr>
<td>Identificador</td>
<td>um código aleatório criado na instalação, que não revela quem você é</td>
</tr>
<tr>
<td>Consentimento</td>
<td>quando você aceitou ou recusou, e a versão desta política</td>
</tr>
</tbody></table>
</div>
<p><strong>Nunca</strong> enviamos: o conteúdo de conversas ou perguntas, arquivos, nomes de
arquivos ou pastas, seu nome, e-mail, telefone ou dados de contas conectadas.
O Nicx filtra os dados antes do envio e descarta qualquer informação que não
esteja na lista acima.</p>
<p>O provedor de infraestrutura pode registrar o endereço IP de cada envio em
registros técnicos de acesso, por tempo limitado e para fins de segurança. A
Falkyria não guarda o IP na base de estatísticas.</p>
<h2 id="4-para-que-usamos">4. Para que usamos</h2>
<p>Somente para melhorar o Nicx: entender se a instalação funciona, quais recursos
são usados, onde ocorrem erros e como está o desempenho. Não usamos esses dados
para publicidade, não traçamos perfis de pessoas e <strong>não vendemos nem
compartilhamos</strong> os dados com terceiros.</p>
<h2 id="5-base-legal">5. Base legal</h2>
<p>O envio de estatísticas se baseia no seu <strong>consentimento</strong> (LGPD, art. 7º, I).
Ele é opcional: recusar não muda nenhuma função do Nicx. Você pode revogá-lo a
qualquer momento, e a revogação vale a partir daquele momento.</p>
<h2 id="6-onde-os-dados-ficam-e-por-quanto-tempo">6. Onde os dados ficam e por quanto tempo</h2>
<p>As estatísticas são armazenadas no <strong>Supabase</strong>, em servidores localizados em
<strong>São Paulo, Brasil</strong>. O Supabase atua como operador, tratando os dados apenas
conforme as instruções da Falkyria.</p>
<p>Os eventos são <strong>apagados automaticamente após 24 meses</strong>.</p>
<p>O acesso é restrito a pessoas autorizadas da Falkyria. A comunicação é
criptografada (HTTPS) e as regras do banco de dados só permitem que o Nicx
<strong>adicione</strong> eventos: nenhuma instalação consegue ler os dados de outra.</p>
<h2 id="7-seus-direitos">7. Seus direitos</h2>
<p>Pela LGPD (art. 18), você pode pedir confirmação de tratamento, acesso,
correção, anonimização, portabilidade, eliminação dos dados, informação sobre
compartilhamento e revogação do consentimento.</p>
<p>No próprio Nicx:</p>
<ul>
<li><strong>Mudar a escolha</strong>: Configurações → Privacidade, ou
<code>nicx config set analytics.enabled false</code> no terminal.</li>
<li><strong>Apagar o que já foi enviado</strong>: Configurações → Privacidade → &quot;Apagar meus
dados&quot;. Isso exclui dos servidores da Falkyria todos os eventos desta
instalação e cria um novo identificador.</li>
</ul>
<p>Para os demais pedidos, ou se tiver dúvidas, escreva para o contato da seção 1.
Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).</p>
<h2 id="8-criancas-e-adolescentes">8. Crianças e adolescentes</h2>
<p>O Nicx não se destina a menores de 18 anos sem a supervisão de um responsável.</p>
<h2 id="9-mudancas-nesta-politica">9. Mudanças nesta política</h2>
<p>Quando esta política mudar de forma relevante, a versão no topo será
atualizada e o Nicx pedirá o seu consentimento de novo antes de enviar
qualquer estatística.</p>
`,headings:[{id:`resumo`,text:`Resumo`},{id:`1-quem-e-responsavel-pelos-dados`,text:`1. Quem é responsável pelos dados`},{id:`2-o-que-fica-apenas-no-seu-computador`,text:`2. O que fica apenas no seu computador`},{id:`3-o-que-enviamos-se-voce-permitir`,text:`3. O que enviamos se você permitir`},{id:`4-para-que-usamos`,text:`4. Para que usamos`},{id:`5-base-legal`,text:`5. Base legal`},{id:`6-onde-os-dados-ficam-e-por-quanto-tempo`,text:`6. Onde os dados ficam e por quanto tempo`},{id:`7-seus-direitos`,text:`7. Seus direitos`},{id:`8-criancas-e-adolescentes`,text:`8. Crianças e adolescentes`},{id:`9-mudancas-nesta-politica`,text:`9. Mudanças nesta política`}]},d={title:`Termos de Uso do Nicx`,version:`Versão 2026-10-23`,html:`<p>Estes termos regem o uso do <strong>Nicx</strong>, a inteligência artificial da
<strong>Falkyria</strong>. Ao usar o Nicx, você concorda com eles.</p>
<h2 id="1-o-que-e-o-nicx">1. O que é o Nicx</h2>
<p>O Nicx é um assistente de inteligência artificial que roda no seu computador,
com modelos de linguagem locais. Ele conversa por texto e por voz, consulta
memórias e documentos que você indexar e, quando você autoriza, usa ferramentas
como busca na web, leitura de arquivos e execução de comandos.</p>
<h2 id="2-licenca">2. Licença</h2>
<p>O Nicx é software proprietário da Falkyria. Você pode usá-lo somente se tiver
recebido autorização da Falkyria, nos limites dessa autorização e da licença
que acompanha o programa (arquivo <code>LICENSE</code>). É proibido copiar, revender,
redistribuir ou criar obras derivadas sem autorização por escrito.</p>
<h2 id="3-a-ia-pode-errar">3. A IA pode errar</h2>
<p>As respostas do Nicx são geradas automaticamente e <strong>podem conter erros,
informações desatualizadas ou incompletas</strong>. Verifique informações importantes,
principalmente sobre saúde, finanças, direito ou segurança, antes de agir com
base nelas. O Nicx não substitui a orientação de um profissional.</p>
<h2 id="4-ferramentas-que-agem-no-seu-computador">4. Ferramentas que agem no seu computador</h2>
<p>Algumas ferramentas podem ler e alterar arquivos, executar comandos ou acessar
a internet. O Nicx pede confirmação antes dessas ações, e <strong>a decisão de
aprovar é sua</strong>. Revise o que será feito, sobretudo ações difíceis de desfazer.</p>
<h2 id="5-uso-aceitavel">5. Uso aceitável</h2>
<p>Você concorda em não usar o Nicx para:</p>
<ul>
<li>atividades ilegais ou que violem direitos de terceiros;</li>
<li>criar conteúdo que promova violência, discriminação, assédio ou exploração;</li>
<li>invadir, danificar ou acessar sem autorização sistemas, contas ou dados;</li>
<li>enganar pessoas fazendo-as acreditar que conversam com um humano quando isso
puder prejudicá-las.</li>
</ul>
<h2 id="6-seu-conteudo">6. Seu conteúdo</h2>
<p>O que você escreve, os arquivos que fornece e as respostas geradas para você
ficam no seu computador e <strong>são seus</strong>. A Falkyria não reivindica direitos
sobre esse conteúdo e não tem acesso a ele.</p>
<h2 id="7-privacidade">7. Privacidade</h2>
<p>O tratamento de dados é descrito na <strong>Política de Privacidade do Nicx</strong>. As
estatísticas de uso só são enviadas com o seu consentimento.</p>
<h2 id="8-servicos-de-terceiros">8. Serviços de terceiros</h2>
<p>Conectores e ferramentas que acessam serviços de terceiros (e-mail, agenda,
mecanismos de busca etc.) dependem desses serviços e de seus próprios termos.
A Falkyria não se responsabiliza pela disponibilidade ou pelo conteúdo deles.</p>
<h2 id="9-sem-garantias">9. Sem garantias</h2>
<p>O Nicx é fornecido &quot;no estado em que se encontra&quot;, sem garantias de qualquer
tipo, na máxima extensão permitida pela lei. A Falkyria não garante que ele
funcionará sem interrupções ou erros.</p>
<h2 id="10-limitacao-de-responsabilidade">10. Limitação de responsabilidade</h2>
<p>Na máxima extensão permitida pela lei, a Falkyria não responde por danos
indiretos, lucros cessantes, perda de dados ou danos decorrentes de decisões
tomadas com base nas respostas do Nicx ou de ações que você aprovou. Nada
nestes termos limita direitos garantidos pelo Código de Defesa do Consumidor
quando ele for aplicável.</p>
<h2 id="11-mudancas">11. Mudanças</h2>
<p>A Falkyria pode atualizar estes termos. A versão vigente fica disponível no
próprio Nicx, com a data no topo.</p>
<h2 id="12-lei-aplicavel">12. Lei aplicável</h2>
<p>Estes termos são regidos pelas leis da República Federativa do Brasil.</p>
`,headings:[{id:`1-o-que-e-o-nicx`,text:`1. O que é o Nicx`},{id:`2-licenca`,text:`2. Licença`},{id:`3-a-ia-pode-errar`,text:`3. A IA pode errar`},{id:`4-ferramentas-que-agem-no-seu-computador`,text:`4. Ferramentas que agem no seu computador`},{id:`5-uso-aceitavel`,text:`5. Uso aceitável`},{id:`6-seu-conteudo`,text:`6. Seu conteúdo`},{id:`7-privacidade`,text:`7. Privacidade`},{id:`8-servicos-de-terceiros`,text:`8. Serviços de terceiros`},{id:`9-sem-garantias`,text:`9. Sem garantias`},{id:`10-limitacao-de-responsabilidade`,text:`10. Limitação de responsabilidade`},{id:`11-mudancas`,text:`11. Mudanças`},{id:`12-lei-aplicavel`,text:`12. Lei aplicável`}]},f=e(n(),1),p=o();function m(e){let t=/(\d{4})-(\d{2})-(\d{2})/.exec(e);return t?`${Number(t[3])} de ${[`janeiro`,`fevereiro`,`março`,`abril`,`maio`,`junho`,`julho`,`agosto`,`setembro`,`outubro`,`novembro`,`dezembro`][Number(t[2])-1]} de ${t[1]}`:e}function h(e){let[t,n]=(0,f.useState)(null),r=e.join(`|`);return(0,f.useEffect)(()=>{let e=r.split(`|`).map(e=>document.getElementById(e)).filter(e=>!!e),t=new IntersectionObserver(e=>{for(let t of e)t.isIntersecting&&n(t.target.id)},{rootMargin:`-90px 0px -65% 0px`});return e.forEach(e=>t.observe(e)),()=>t.disconnect()},[r]),t}function g({page:e,doc:n,lead:o}){let u=h(n.headings.map(e=>e.id)),d=e===`privacy`?{href:i.terms,label:`Termos de uso`,icon:(0,p.jsx)(c,{className:`size-4`})}:{href:i.privacy,label:`Política de privacidade`,icon:(0,p.jsx)(l,{className:`size-4`})};return(0,p.jsx)(s,{page:e,children:(0,p.jsxs)(`div`,{className:`container-site`,children:[(0,p.jsxs)(`header`,{className:`max-w-3xl pt-14 pb-12 sm:pt-20 sm:pb-16`,children:[(0,p.jsx)(a,{className:`rise`,children:`Legal`}),(0,p.jsx)(`h1`,{className:`rise text-gradient mt-4 text-[40px] leading-[1.04] font-semibold tracking-[-0.042em] text-balance sm:text-[56px]`,style:{animationDelay:`80ms`},children:n.title}),(0,p.jsx)(`p`,{className:`rise mt-5 text-[17px] leading-relaxed text-muted sm:text-lg`,style:{animationDelay:`160ms`},children:o}),(0,p.jsxs)(`p`,{className:`rise mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[13px] text-muted`,style:{animationDelay:`220ms`},children:[(0,p.jsx)(`span`,{className:`size-1.5 rounded-full bg-amber`,"aria-hidden":`true`}),`Versão de `,m(n.version)]})]}),(0,p.jsxs)(`div`,{className:`grid gap-12 border-t border-line pt-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-20`,children:[(0,p.jsx)(`nav`,{"aria-label":`Nesta página`,className:`hidden lg:block`,children:(0,p.jsxs)(`div`,{className:`sticky top-28`,children:[(0,p.jsx)(`p`,{className:`text-[13px] font-medium text-ink`,children:`Nesta página`}),(0,p.jsx)(`ul`,{className:`mt-4 flex flex-col gap-2.5 border-l border-line`,children:n.headings.map(e=>(0,p.jsx)(`li`,{children:(0,p.jsx)(`a`,{href:`#${e.id}`,"aria-current":u===e.id?`location`:void 0,className:r(`-ml-px block border-l pl-4 text-[13.5px] leading-snug transition-colors hover:border-ink hover:text-ink`,u===e.id?`border-ink font-medium text-ink`:`border-transparent text-muted`),children:e.text})},e.id))})]})}),(0,p.jsxs)(`div`,{className:`min-w-0 max-w-[720px]`,children:[(0,p.jsx)(`article`,{className:`prose-legal`,dangerouslySetInnerHTML:{__html:n.html}}),(0,p.jsxs)(`a`,{href:d.href,className:`group mt-16 flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 shadow-card transition-colors hover:border-line-strong`,children:[(0,p.jsx)(`span`,{className:`grid size-10 place-items-center rounded-xl bg-accent-soft text-accent`,children:d.icon}),(0,p.jsxs)(`span`,{className:`flex-1`,children:[(0,p.jsx)(`span`,{className:`block text-[13px] text-muted`,children:`Leia também`}),(0,p.jsx)(`span`,{className:`block text-[16px] font-medium text-ink`,children:d.label})]}),(0,p.jsx)(t,{className:`size-4 text-muted transition-transform group-hover:translate-x-0.5`,"aria-hidden":`true`})]})]})]})]})})}function _(){return(0,p.jsx)(g,{page:`privacy`,doc:u,lead:`Quais dados o Nicx trata, por quê, e como você controla isso. Em resumo: o que você faz no Nicx fica no seu computador.`})}function v(){return(0,p.jsx)(g,{page:`terms`,doc:d,lead:`As regras para usar o Nicx, escritas da forma mais direta que conseguimos.`})}export{v as n,_ as t};
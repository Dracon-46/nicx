import privacy from '../content/politica-de-privacidade.md';
import terms from '../content/termos-de-uso.md';
import { LegalPage } from './LegalPage';

export function PrivacyPage() {
  return (
    <LegalPage
      page="privacy"
      doc={privacy}
      lead="Quais dados o Nicx trata, por quê, e como você controla isso. Em resumo: o que você faz no Nicx fica no seu computador."
    />
  );
}

export function TermsPage() {
  return (
    <LegalPage
      page="terms"
      doc={terms}
      lead="As regras para usar o Nicx, escritas da forma mais direta que conseguimos."
    />
  );
}

insert into public.segments (
  slug, title, short_name, hero_headline, hero_subheadline,
  hero_image_path, hero_image_alt, category_image_path, category_image_alt,
  intro, position, is_published
)
values
  ('uniformes-profissionais', 'Uniformes Profissionais', 'Corporativo', 'Uniformes corporativos que reforçam a imagem da sua empresa', 'Camisas sociais, calças, coletes e jaquetas personalizados com a identidade visual da sua marca.', '/placeholders/hero-uniformes-profissionais.jpg', 'Uniformes Profissionais — Texas Uniformes', '/placeholders/category-uniformes-profissionais.jpg', 'Uniformes Profissionais — Texas Uniformes', 'Desenvolvemos uniformes administrativos e operacionais para empresas de médio e grande porte, com foco em conforto, durabilidade e padronização visual da equipe.', 1, true),
  ('linha-hospitalar', 'Linha Hospitalar', 'Hospitalar', 'Uniformes hospitalares que unem conforto, higiene e segurança', 'Jalecos, scrubs e uniformes técnicos para hospitais e clínicas, com tecidos apropriados para uso profissional de saúde.', '/placeholders/hero-linha-hospitalar.jpg', 'Linha Hospitalar — Texas Uniformes', '/placeholders/category-linha-hospitalar.jpg', 'Linha Hospitalar — Texas Uniformes', 'Fabricamos a linha hospitalar com tecidos de fácil higienização, conforto para longas jornadas e personalização por setor.', 2, true),
  ('uniformes-escolares', 'Uniformes Escolares', 'Escolar', 'Uniformes escolares resistentes para o dia a dia dos alunos', 'Confecção completa de uniformes escolares com tecidos duráveis para escolas particulares de todos os portes.', '/placeholders/hero-uniformes-escolares.jpg', 'Uniformes Escolares — Texas Uniformes', '/placeholders/category-uniformes-escolares.jpg', 'Uniformes Escolares — Texas Uniformes', 'Produzimos uniformes escolares completos com foco em durabilidade para o uso diário e identidade visual da instituição.', 3, true),
  ('texteis-hotelaria', 'Têxteis para Hotelaria', 'Hotelaria', 'Têxteis e uniformes para hotéis e pousadas', 'Enxoval, toalhas e uniformes de equipe para hotéis e pousadas que buscam padrão e conforto.', '/placeholders/hero-texteis-hotelaria.jpg', 'Têxteis para Hotelaria — Texas Uniformes', '/placeholders/category-texteis-hotelaria.jpg', 'Têxteis para Hotelaria — Texas Uniformes', 'Fornecemos enxoval completo e uniformes de equipe para hotéis e pousadas, com foco em conforto e padronização visual.', 4, true)
on conflict (slug) do update set
  title = excluded.title, short_name = excluded.short_name,
  hero_headline = excluded.hero_headline, hero_subheadline = excluded.hero_subheadline,
  hero_image_path = excluded.hero_image_path, hero_image_alt = excluded.hero_image_alt,
  category_image_path = excluded.category_image_path, category_image_alt = excluded.category_image_alt,
  intro = excluded.intro, position = excluded.position, is_published = excluded.is_published;

insert into public.segment_benefits (segment_id, icon, title, description, position)
select s.id, seed.icon, seed.title, seed.description, seed.position
from (values
  ('uniformes-profissionais', 'briefcase', 'Padronização de equipe', 'Identidade visual consistente em todos os setores da empresa.', 1),
  ('uniformes-profissionais', 'shirt', 'Tecidos sob medida', 'Opções de tecido de acordo com o ambiente de trabalho.', 2),
  ('uniformes-profissionais', 'badge-check', 'Bordado corporativo', 'Logotipo bordado ou estampado com acabamento profissional.', 3),
  ('linha-hospitalar', 'cross', 'Tecidos apropriados', 'Materiais pensados para rotina hospitalar e higienização frequente.', 1),
  ('linha-hospitalar', 'users', 'Diferenciação por setor', 'Cores e cortes distintos para identificar equipes rapidamente.', 2),
  ('linha-hospitalar', 'shield-check', 'Conforto para plantões longos', 'Modelagem pensada para uso durante toda a jornada de trabalho.', 3),
  ('uniformes-escolares', 'shirt', 'Alta durabilidade', 'Tecidos resistentes ao uso diário e à lavagem frequente.', 1),
  ('uniformes-escolares', 'palette', 'Identidade da escola', 'Cores, brasão e bordado personalizados conforme a instituição.', 2),
  ('uniformes-escolares', 'ruler', 'Tabela de tamanhos completa', 'Do infantil ao adulto, para atender toda a comunidade escolar.', 3),
  ('texteis-hotelaria', 'bed', 'Enxoval completo', 'Lençóis, toalhas e colchas com padrão hoteleiro de qualidade.', 1),
  ('texteis-hotelaria', 'shirt', 'Uniformes de equipe', 'Recepção, camareiras e restaurante com visual padronizado.', 2),
  ('texteis-hotelaria', 'sparkles', 'Conforto para o hóspede', 'Tecidos selecionados para experiência de hospedagem superior.', 3)
) as seed(slug, icon, title, description, position)
join public.segments s on s.slug = seed.slug
on conflict (segment_id, position) do update set icon = excluded.icon, title = excluded.title, description = excluded.description;

insert into public.segment_gallery_images (segment_id, image_path, alt, position)
select s.id, format('/placeholders/gallery-%s-%s.jpg', s.slug, n), format('Peça de %s — Texas Uniformes', lower(s.title)), n
from public.segments s cross join generate_series(1, 4) as n
where s.slug in ('uniformes-profissionais', 'linha-hospitalar', 'uniformes-escolares', 'texteis-hotelaria')
on conflict (segment_id, position) do update set image_path = excluded.image_path, alt = excluded.alt;

insert into public.faq_items (segment_id, question, answer, position, is_published)
select s.id, seed.question, seed.answer, seed.position, true
from (values
  ('uniformes-profissionais', 'Qual a quantidade mínima de peças por pedido?', 'Trabalhamos sob encomenda para empresas. A quantidade mínima varia conforme o modelo; fale com nosso time para uma resposta específica.', 1),
  ('uniformes-profissionais', 'Qual o prazo de produção?', 'O prazo depende da quantidade e complexidade da personalização. Após aprovação do orçamento, informamos uma data estimada de entrega.', 2),
  ('uniformes-profissionais', 'Como tirar as medidas dos funcionários à distância?', 'Enviamos uma tabela de medidas padrão e orientações simples para a equipe de RH coletar os dados.', 3),
  ('linha-hospitalar', 'Os tecidos são adequados para higienização hospitalar frequente?', 'Sim, trabalhamos com tecidos resistentes a lavagens frequentes, mantendo conforto e durabilidade.', 1),
  ('linha-hospitalar', 'É possível personalizar por setor do hospital?', 'Sim, definimos cores e bordados diferentes por setor para facilitar a identificação visual.', 2),
  ('linha-hospitalar', 'Qual o prazo mínimo para um pedido hospitalar?', 'Varia conforme a quantidade solicitada. Envie sua necessidade para receber um prazo estimado.', 3),
  ('uniformes-escolares', 'Vocês atendem escolas de qualquer tamanho?', 'Sim, atendemos desde escolas menores até instituições com várias unidades e grande volume de alunos.', 1),
  ('uniformes-escolares', 'Como funciona a reposição durante o ano letivo?', 'Após o pedido inicial, a escola pode solicitar reposições pontuais conforme a necessidade.', 2),
  ('uniformes-escolares', 'É possível incluir o brasão da escola bordado?', 'Sim, o brasão ou logotipo da instituição pode ser bordado ou estampado nas peças.', 3),
  ('texteis-hotelaria', 'Vocês fornecem enxoval e uniformes juntos?', 'Sim, atendemos tanto o enxoval quanto os uniformes da equipe do hotel ou pousada.', 1),
  ('texteis-hotelaria', 'Há quantidade mínima para pousadas menores?', 'Trabalhamos sob encomenda e ajustamos a proposta conforme o porte do estabelecimento.', 2),
  ('texteis-hotelaria', 'Os tecidos aguentam lavagens industriais frequentes?', 'Sim, selecionamos tecidos resistentes ao ciclo intenso de lavagem industrial típico da hotelaria.', 3)
) as seed(slug, question, answer, position)
join public.segments s on s.slug = seed.slug
where not exists (
  select 1
  from public.faq_items existing
  where existing.segment_id = s.id
    and existing.position = seed.position
);

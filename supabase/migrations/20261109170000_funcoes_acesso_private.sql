-- Tira as funções de checagem de acesso da API pública (/rest/v1/rpc/...), sem mudar as regras.
-- As políticas guardam a função pelo identificador interno: passam a apontar para private.* sozinhas.
-- Aplicada no banco de produção em 09/11/2026.
create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to anon, authenticated;

alter function public.has_content_access() set schema private;
alter function public.is_admin() set schema private;

revoke all on function private.has_content_access() from public;
revoke all on function private.is_admin() from public;
grant execute on function private.has_content_access() to anon, authenticated;
grant execute on function private.is_admin() to anon, authenticated;

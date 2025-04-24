
set -e

echo "Esperando a que la base de datos esté disponible..."
until dotnet ef database update; do
  >&2 echo "Postgres aún no está listo. Reintentando..."
  sleep 3
done

echo "Migración completada. Iniciando aplicación..."
exec dotnet run

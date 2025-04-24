FROM mcr.microsoft.com/dotnet/sdk:9.0

WORKDIR /app

COPY .config/dotnet-tools.json .config/dotnet-tools.json
RUN dotnet tool restore
ENV PATH="$PATH:/root/.dotnet/tools"

COPY InventarioAPI.csproj ./
RUN dotnet restore

COPY . .

RUN dotnet build -c Debug -o out

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 5178

ENTRYPOINT ["./entrypoint.sh"]

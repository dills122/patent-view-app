Start-Job -Name 'USPTO-Frontend' -ScriptBlock {
    npm run start --prefix ..\apps\site
}

Start-Job -Name 'USPTO-Backend' -ScriptBlock {
    npm run build --prefix ..\apps\uspto-patents-view-api
    npm run start --prefix ..\apps\nestjs-api
}
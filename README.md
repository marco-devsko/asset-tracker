### Adding new component
```
nx g @nx/angular:component \
  --path=apps/asset-tracker-pro/src/app/features/assets/add-asset \
  --type=component
```

### Adding new service
```
nx g @nx/angular:service asset.service \
  --project=asset-tracker-pro \
  --path=apps/asset-tracker-pro/src/app/features/assets
```
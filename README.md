# Wrestling-Like Bot

## Development

Be sure of run next command with required environment variables

```sh
npx ts-node src/app.ts
```

## Environment Variables

| Name           | Required | Default | Notes |
|----------------|----------|---------|-------|
| DISCORD_TOKEN  | Yes      |         |       |
| DISCORD_BOT_ID | Yes      |         |       |
| REDIS_URL      | Yes      |         |       |
| REDIS_PORT     | Yes      |         |       |

## Bot Commands

### Assign

```
!wlb asssign [youtube_url] [starts?] [length?]
```

Example:

```
!wlb assign https://www.youtube.com/watch?v=dQw4w9WgXcQ 42s 9s
```

### Debug

This command will print data stored in redis for debugging purpose

```
!wlb debug
```

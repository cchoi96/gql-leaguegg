# A GraphQL API that aggregates data from the Riot League of Legends API to provide relevant info about champions and summoner match data.

## Usage
Playground available at https://gql-leaguegg.herokuapp.com.

## Sample Queries (look at the schema and docs on the right side of the playground website to customize the queries)
```
query getSummonerData {
  summoner(name: "Doublelift") {
    id,
    name,
    ranked {
      leagueId,
      queue,
      tier,
      rank,
      points
    }
  }
}

query getChampionData {
  champion(name: "Lucian") {
    title,
    desc,
    tags,
    image {
      full,
      icon
    }
  }
}

query getFreeChampionsList {
  freeChampions {
    name,
    title,
    desc,
    image {
      full,
      icon
    }
  }
}
```

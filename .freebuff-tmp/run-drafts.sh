#!/bin/bash
cd "$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
while read -r slug; do
  [ -z "$slug" ] && continue
  node .freebuff/build-topic-bank.cjs --topic "$slug" > ".freebuff-tmp/draft-logs/$slug.log" 2>&1
  echo "$slug EXIT=$?" >> .freebuff-tmp/draft-logs/_status.txt
done < .freebuff-tmp/slugs.txt
echo ALLDONE >> .freebuff-tmp/draft-logs/_status.txt

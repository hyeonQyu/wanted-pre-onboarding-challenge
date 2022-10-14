---
categories:
  - Development
date: "2022-10-14"
description: HTTP 캐시 무효 전략
slug: stale-while-revalidate
tags:
  - SWR 
title: stale-while-revalidate
---

# stale-while-revalidate
HTTP 캐시 무효 전략

## 개요
stale-while-revalidate 는 캐시(stale)에서 데이터를 반환한 후, fetch 요청(revalidate)을 하고, 최신화된 데이터를 가져오는 전략입니다.

## SWR
stale-while-revalidate 로부터 유래된 SWR 라이브러리를 사용하여 Server State와 UI State를 분리하여 관리할 수 있습니다.

## Server State vs UI State
### Server State
서버로부터 불러오는 데이터로 비동기 요청을 통해 가져옵니다.
다른 사용자가 Server State를 변경할 수 있기 때문에 시간이 지나면 stale한 상태가 되거나 outdated가 될 수 있습니다.
따라서 Server State를 적절히 다루기 위해서는 캐싱, stale한 데이터 업데이트, 데이터 변경 요청 후 업데이트 등의 작업이 필요합니다.

### UI State
Client State라고도 하여 클라이언트가 제어하는 상태이며 Server State를 제외한 UI를 그리기 위해 사용되는 데이터입니다. 
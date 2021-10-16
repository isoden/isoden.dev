---
slug: 2019-04-16-use-instance-id
title: Function Component のインスタンスごとに一意な値を割り振る
date: 2019-04-16T11:27:59.723Z
author: isoden
tags:
  - react
  - javascript
---

React v16.8+ のお話。
hooks を利用して、 Function Component のインスタンスごとに一意な値を割り当てる方法。

```tsx
import React from 'react'

let counter = 0

const useInstanceId = (): number => {
  const ref = React.useRef<number | null>(null)

  if (ref.current === null) {
    ref.current = counter += 1
  }

  return ref.current
}
```

```tsx
import React from 'react'
import { useInstanceId } from './useInstanceId'

const Example = () => {
  const id = useInstanceId()

  return <span>{id}</span>
}
```

こうすると `DemoComponent` コンポーネントのインスタンスごとに一意な `id` が割り振られる。 `Ref` を用いることで再描画が発生しても `id` は変わらない。
この方法はインスタンス変数を使う方法として公式ドキュメントに載っていた。

> <a href="https://ja.reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables" rel="noopener noreferrer">インスタンス変数のようなものはありますか？ | フックに関するよくある質問 – React</a>

`React.useRef()` で返るオブジェクトは `MutableRefObject` として定義されており、 `current` プロパティが読み書き可能になっている。 そこに値をセットして使うというもの。

`let counter` が気になる気がしないでもないが、まあしゃーなし。

ユースケースとしてはこんな感じ。

```tsx
import React from 'react'
import { useInstanceId } from './useInstanceId'

const ExamplePanel = (props: { children: React.ReactNode }) => {
  const id = useInstanceId()

  return (
    <>
      <button aria-controls={'demo-pane-' + id}>トグルする</button>
      <div id={'demo-pane-' + id}>{props.children}</div>
    </>
  )
}
```

実装はいろいろ省略しているが、 汎用的なコンポーネント内で `id` 属性を使う場合は値の重複を避けたい。 そんなときに使える。

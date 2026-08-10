/**
 * 注釈を出す経過年数の閾値（降順）。
 * 該当する最大の閾値だけを表示するため、降順に並べて先頭一致で打ち切る。
 */
const AGE_NOTICE_THRESHOLDS = [10, 5, 3, 1] as const;

/**
 * 公開日から現在までの経過年数をカレンダー年ベースで返す。
 *
 * - 公開日が未来の場合は負の値を返す。
 * - 基準タイムゾーンは UTC。記事ページの公開日表示 (`toLocaleDateString`) も
 *   Cloudflare Workers 上では UTC で解決されるため、そちらと基準を揃えている。
 *   JST 基準に変えると「表示は 1/1 なのに注釈は前年扱い」といったズレが出る。
 * - ミリ秒差を 365.25 日で割る方式は採らない。うるう年の並びによって
 *   記念日当日に 1 年未満と判定されうるため。
 */
export function getElapsedYears(publishedAt: Date, now: Date): number {
	const years = now.getUTCFullYear() - publishedAt.getUTCFullYear();

	// 今年の「公開記念日」をまだ迎えていなければ 1 年分を差し引く。
	// 2/29 公開の記事は平年だと 3/1 に記念日を迎える扱いになる。
	const beforeAnniversary =
		now.getUTCMonth() < publishedAt.getUTCMonth() ||
		(now.getUTCMonth() === publishedAt.getUTCMonth() &&
			now.getUTCDate() < publishedAt.getUTCDate());

	return beforeAnniversary ? years - 1 : years;
}

/**
 * 記事の経過年数に応じた注釈文を返す。閾値未満（1 年未満）や公開日未設定なら null。
 *
 * @param publishedAt 初投稿日。未設定の記事では null/undefined が渡る。
 * @param now 判定基準時刻。既定は現在時刻。
 */
export function getPostAgeNotice(
	publishedAt: Date | null | undefined,
	now: Date = new Date(),
): string | null {
	if (!publishedAt) return null;

	const elapsedYears = getElapsedYears(publishedAt, now);
	const threshold = AGE_NOTICE_THRESHOLDS.find((y) => elapsedYears >= y);

	return threshold
		? `この記事は公開から${threshold}年以上経過しています`
		: null;
}

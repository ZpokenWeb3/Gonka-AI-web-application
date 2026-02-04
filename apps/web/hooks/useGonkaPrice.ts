import { useEffect, useState } from "react";

interface UseGonkaPriceResult {
  priceUsd: number;
  loading: boolean;
  error: string | null;
}

export function useGonkaPrice(): UseGonkaPriceResult {
  const [priceUsd, setPriceUsd] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchPrice = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          "https://api.coinpaprika.com/v1/tickers/gnk-gonka"
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch GNK price: ${res.status}`);
        }

        const data = await res.json();
        const usd = data?.quotes?.USD.price;

        if (!isCancelled) {
          if (typeof usd === "number") {
            setPriceUsd(usd);
          } else {
            setPriceUsd(0);
            setError("GNK price not found in response");
          }
        }
      } catch (e: any) {
        if (!isCancelled) {
          setError(e?.message || "Failed to fetch GNK price");
          setPriceUsd(0);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchPrice();

    // периодическое обновление раз в минуту
    const intervalId = setInterval(fetchPrice, 60_000);

    return () => {
      isCancelled = true;
      clearInterval(intervalId);
    };
  }, []);

  return { priceUsd, loading, error };
}


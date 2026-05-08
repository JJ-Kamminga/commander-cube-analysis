"use client";
import { useState } from "react";
import { Tooltip } from "@mui/material";
import { apiURL } from "@/utils/mtg-scripting-toolkit/scryfall/config";
import Image from "next/image";

const artCache = new Map<string, Promise<string | null>>();

function fetchArtUrl(name: string): Promise<string | null> {
  if (!artCache.has(name)) {
    artCache.set(
      name,
      fetch(`${apiURL}/cards/named?exact=${encodeURIComponent(name)}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((card) => {
          if (!card) return null;
          return (
            card.image_uris?.normal ??
            card.card_faces?.[0]?.image_uris?.normal ??
            null
          );
        })
        .catch(() => null),
    );
  }
  return artCache.get(name)!;
}

export function CardName({ name }: { name: string }) {
  const [artUrl, setArtUrl] = useState<string | null | undefined>(undefined);

  return (
    <Tooltip
      title={
        artUrl ? (
          <Image
            src={artUrl}
            width={280}
            height={390}
            alt={`Card scan of ${name}`}
            style={{ display: "block" }}
          />
        ) : (
          name
        )
      }
      onOpen={() => {
        if (artUrl === undefined) {
          fetchArtUrl(name).then(setArtUrl);
        }
      }}
      slotProps={{
        tooltip: {
          sx: artUrl ? { p: 0, overflow: "hidden", borderRadius: 1 } : {},
        },
      }}
    >
      <span
        style={{
          borderBottom: "1px dotted currentColor",
          cursor: "default",
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </span>
    </Tooltip>
  );
}

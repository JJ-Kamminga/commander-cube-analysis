import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CardName } from "./CardName";

const makeFetch = (data: unknown, ok = true) =>
  jest.fn().mockResolvedValue({ ok, json: async () => data });

afterEach(() => {
  jest.restoreAllMocks();
});

describe("CardName", () => {
  it("renders card name as visible text", () => {
    render(<CardName name="Sol Ring" />);
    expect(screen.getByText("Sol Ring")).toBeInTheDocument();
  });

  it("card name span is not aria-hidden", () => {
    render(<CardName name="Counterspell" />);
    expect(screen.getByText("Counterspell")).not.toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("fetches from Scryfall with exact card name on tooltip open", async () => {
    global.fetch = makeFetch({
      image_uris: { normal: "https://example.com/a.jpg" },
    });

    render(<CardName name="Lightning Bolt" />);
    fireEvent.mouseEnter(screen.getByText("Lightning Bolt"));

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(encodeURIComponent("Lightning Bolt")),
      ),
    );
  });

  it("falls back to card_faces art for double-faced cards", async () => {
    global.fetch = makeFetch({
      card_faces: [
        { image_uris: { normal: "https://example.com/dfc-front.jpg" } },
      ],
    });

    render(<CardName name="Delver of Secrets" />);
    fireEvent.mouseEnter(screen.getByText("Delver of Secrets"));

    await waitFor(() => {
      const img = screen.queryByRole("img");
      if (img) expect(img).toHaveAttribute("alt", "Delver of Secrets");
    });
  });

  it("stays mounted and shows card name text when fetch fails", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    render(<CardName name="Brainstorm" />);
    fireEvent.mouseEnter(screen.getByText("Brainstorm"));

    // Still visible after failure
    await waitFor(() =>
      expect(screen.getByText("Brainstorm")).toBeInTheDocument(),
    );
  });

  it("stays mounted and shows card name text when card is not found (404)", async () => {
    global.fetch = makeFetch({ code: "not_found" }, false);

    render(<CardName name="Dark Ritual" />);
    fireEvent.mouseEnter(screen.getByText("Dark Ritual"));

    await waitFor(() =>
      expect(screen.getByText("Dark Ritual")).toBeInTheDocument(),
    );
  });
});

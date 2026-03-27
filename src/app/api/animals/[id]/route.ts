import { NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { initialAnimals, type Animal } from "@/data/animals";

const DATA_PATH = join(process.cwd(), "public", "animals.json");

function ensureDataDir() {
  const dir = dirname(DATA_PATH);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function getAnimals(): Animal[] {
  try {
    if (existsSync(DATA_PATH)) {
      const raw = readFileSync(DATA_PATH, "utf-8");
      return JSON.parse(raw);
    }
  } catch {
    // fall through
  }
  ensureDataDir();
  writeFileSync(DATA_PATH, JSON.stringify(initialAnimals, null, 2));
  return initialAnimals;
}

function saveAnimals(animals: Animal[]) {
  ensureDataDir();
  writeFileSync(DATA_PATH, JSON.stringify(animals, null, 2));
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const animals = getAnimals();
  const animal = animals.find((a) => a.id === params.id);
  if (!animal) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(animal);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const animals = getAnimals();
    const index = animals.findIndex((a) => a.id === params.id);

    if (index === -1) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    animals[index] = {
      ...animals[index],
      ...body,
      id: params.id,
      weight: body.weight ? Number(body.weight) : animals[index].weight,
      age: body.age ? Number(body.age) : animals[index].age,
      price: body.price ? Number(body.price) : animals[index].price,
    };

    saveAnimals(animals);
    return NextResponse.json(animals[index]);
  } catch {
    return NextResponse.json(
      { error: "Failed to update" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const animals = getAnimals();
    const filtered = animals.filter((a) => a.id !== params.id);

    if (filtered.length === animals.length) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    saveAnimals(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete" },
      { status: 500 }
    );
  }
}

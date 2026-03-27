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
  // Initialize with default data
  ensureDataDir();
  writeFileSync(DATA_PATH, JSON.stringify(initialAnimals, null, 2));
  return initialAnimals;
}

function saveAnimals(animals: Animal[]) {
  ensureDataDir();
  writeFileSync(DATA_PATH, JSON.stringify(animals, null, 2));
}

export async function GET() {
  const animals = getAnimals();
  return NextResponse.json(animals);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const animals = getAnimals();

    const newAnimal: Animal = {
      id:
        body.id ||
        `${body.type}-${Date.now().toString(36)}`,
      name: body.name,
      type: body.type,
      breed: body.breed,
      weight: Number(body.weight),
      age: Number(body.age),
      price: Number(body.price),
      image: body.image || "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800&q=80",
      images: body.images || [body.image || "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800&q=80"],
      healthStatus: body.healthStatus || "good",
      certification: body.certification || ["veterinary-checked", "halal-certified"],
      description: body.description || "",
      gender: body.gender || "male",
      color: body.color || "",
      featured: body.featured || false,
      videoUrl: body.videoUrl,
    };

    animals.push(newAnimal);
    saveAnimals(animals);

    return NextResponse.json(newAnimal, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create animal" },
      { status: 500 }
    );
  }
}

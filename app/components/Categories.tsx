import { cn } from "@/lib/utils";
import { 
  TestTube, 
  Pill, 
  Heart, 
  Baby, 
  Smartphone, 
  Package, 
  LayoutGrid 
} from "lucide-react";
import { Category } from "@/lib/generated/prisma";

interface CategoryCardsProps {
  selectedCategory?: Category;
  onSelectCategory: (category?: Category) => void;
}

const categories = [
  {
    id: "all",
    name: "Browse All",
    icon: LayoutGrid,
  },
  {
    id: Category.OVULATION_TESTS,
    name: "Ovulation & Fertility Tests",
    icon: TestTube,
  },
  {
    id: Category.SUPPLEMENTS,
    name: "Supplements",
    icon: Pill,
  },
  {
    id: Category.FERTILITY_FRIENDLY,
    name: "Fertility Friendly Products",
    icon: Heart,
  },
  {
    id: Category.PREGNANCY_TESTS,
    name: "Pregnancy Tests",
    icon: Baby,
  },
  {
    id: Category.APPS_TRACKERS,
    name: "Apps & Trackers",
    icon: Smartphone,
  },
  {
    id: Category.OTHER,
    name: "Other",
    icon: Package,
  },
];

function CategoryCards({ selectedCategory, onSelectCategory }: CategoryCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
      {categories.map((category) => {
        const Icon = category.icon;
        const isSelected = category.id === selectedCategory || 
                          (category.id === "all" && !selectedCategory);
        
        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id === "all" ? undefined : category.id as Category)}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-lg border transition-all",
              isSelected 
                ? "border-primary bg-primary/5 text-primary" 
                : "border-border hover:border-primary/50 hover:bg-primary/5"
            )}
          >
            <Icon className={cn(
              "h-8 w-8 mb-2",
              isSelected ? "text-primary" : "text-muted-foreground"
            )} />
            <span className="text-sm font-medium text-center">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
}

export default CategoryCards;
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterState } from "@/types";

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onReset: () => void;
}

const sortOptions = [
  { value: "rating_desc", label: "Rating: High to Low" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A to Z" },
];

export default function FilterPanel({ filters, onFilterChange, onReset }: FilterPanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="sort">Sort By</Label>
          <Select
            value={filters.sort}
            onValueChange={(value) => onFilterChange({ sort: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select sort option" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Price Range</Label>
            <span className="text-sm text-muted-foreground">
              ${filters.minPrice || 0} - ${filters.maxPrice || 200}
            </span>
          </div>
          <Slider
            defaultValue={[filters.minPrice || 0, filters.maxPrice || 200]}
            min={0}
            max={200}
            step={5}
            onValueChange={([min, max]) => 
              onFilterChange({ minPrice: min, maxPrice: max })
            }
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Minimum Rating</Label>
            <span className="text-sm text-muted-foreground">
              {filters.minRating || 0} stars
            </span>
          </div>
          <Slider
            defaultValue={[filters.minRating || 0]}
            min={0}
            max={5}
            step={0.5}
            onValueChange={([value]) => onFilterChange({ minRating: value })}
          />
        </div>
      </div>
    </div>
  );
}
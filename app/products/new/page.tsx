import ProductForm from "@/app/components/ProductForm";

export const metadata = {
  title: "Add New Product | The Fertility Edit",
  description: "Add a new product to The Fertility Edit directory",
};

export default function AddProductPage() {
  return (
    <div className="container p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Add New Product</h1>
        <p className="text-muted-foreground">
          Fill out the form below to add a new product to The Fertility Edit directory.
        </p>
        
        <div className="border rounded-lg p-6">
          <ProductForm />
        </div>
      </div>
    </div>
  );
}
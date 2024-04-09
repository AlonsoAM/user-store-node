export class CreateProductDto {
    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly user: string, // ID del usuario
        public readonly category: string, // ID de la categoría
    ) {
    }

    static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
        const {name, available, price, description, user, category} = object;
        if (!name) return ["Name is required"];
        if (!user) return ["User is required"];
        if (!category) return ["Category is required"];

        return [undefined, new CreateProductDto(name, !!available, price, description, user, category)];
    }
}
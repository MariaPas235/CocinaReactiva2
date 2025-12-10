export interface Recipe {
  id: string
  title: string
  category: string
  ingredients: string[]
  steps: string
  servings: number
  favorite?: boolean
}

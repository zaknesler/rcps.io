import type { Recipe } from '@prisma/client'
import { cx } from 'class-variance-authority'
import { PulsingItems } from '~/components/pulsing-items'

type RecipeCardProps = {
  isLoading?: boolean
  recipe?: Recipe | null
  className?: string
}

const noteSymbols = ['*', '**', '†', '‡', '§', '‖', '¶', '‡‡', '§§']

export const RecipeCard: React.FC<RecipeCardProps> = ({
  isLoading = false,
  recipe,
  className,
}) => {
  const notesWithSymbols = recipe?.notes?.map((note, index) => ({
    ...note,
    symbol: noteSymbols[index % noteSymbols.length],
  }))

  return (
    <article
      aria-label={recipe?.title}
      className={cx(
        'flex flex-col gap-6 border border-black p-4 text-sm md:p-8 md:text-base',
        className,
      )}
    >
      {isLoading ? (
        <>
          <PulsingItems count={1} itemHeightClass="h-16 w-1/2" />
          <PulsingItems count={1} itemHeightClass="h-16" />
          <PulsingItems count={1} itemHeightClass="h-48" />
          <PulsingItems count={1} itemHeightClass="h-48" />
        </>
      ) : (
        recipe && (
          <>
            <h1 className="max-w-lg text-2xl font-bold leading-snug md:text-3xl">
              {recipe.title}
            </h1>

            <p>{recipe.summary}</p>

            {!!recipe.ingredients.length && (
              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold md:text-xl">
                  Ingredients
                </h2>
                <ul className="ml-8 flex list-disc flex-col gap-1.5">
                  {recipe.ingredients.map(ingredient => (
                    <li key={`ingredient-${ingredient.id}`}>
                      <strong>{ingredient.amount}</strong> {ingredient.name}
                      {ingredient.prep && `, ${ingredient.prep}`}
                      {ingredient.to_taste && `, or to taste`}
                      {ingredient.note_id && (
                        <a href={`#note-${recipe.slug}-${ingredient.note_id}`}>
                          {
                            notesWithSymbols?.find(
                              note => note.id === ingredient.note_id,
                            )?.symbol
                          }
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {!!recipe.steps.length && (
              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold md:text-xl">
                  Instructions
                </h2>
                <ol className="ml-8 flex list-decimal flex-col gap-4">
                  {recipe.steps.map((step, index) => (
                    <li key={`step-${index}`}>{step.text}</li>
                  ))}
                </ol>
              </section>
            )}

            {!!recipe.notes.length && (
              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold md:text-xl">Notes</h2>
                {recipe.notes.map((note, index) => (
                  <p
                    key={`note-${index}`}
                    id={`note-${recipe.slug}-${note.id}`}
                  >
                    {recipe.ingredients.some(
                      ingredient => ingredient.note_id === note.id,
                    ) && noteSymbols[index % noteSymbols.length]}
                    {note.text}
                  </p>
                ))}
              </section>
            )}
          </>
        )
      )}
    </article>
  )
}

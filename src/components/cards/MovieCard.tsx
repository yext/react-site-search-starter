import { valueToNode } from "@babel/types";
import { stringify } from "querystring";
import { CardProps } from "../../models/cardComponent";

export interface MovieCardProps extends CardProps {};

interface Photo {
  url: string,
  width: number,
  height: number
}

interface SimplePhoto extends Photo {
  sourceUrl: string,
  thumbnails: Photo[]
}

function isSimplePhoto(data: unknown): data is SimplePhoto {
  if(typeof data !== 'object' || data === null) {
    return false;
  }
  const expectedKeys = ['url', 'width', 'height', 'sourceUrl', 'thumbnails'];
  return expectedKeys.every(key => {
    return key in data
  });
}

function isString(data: unknown): data is string {
  return typeof data === 'string';
}

function isStringArray(data: unknown): data is string[] {
  return Array.isArray(data) && data.every(item => typeof item === 'string');
}

export function MovieCard(props: MovieCardProps): JSX.Element {
  const { configuration, result } = props;

  const moviePosterUrl = 
    isSimplePhoto(result.rawData.c_poster) ? result.rawData.c_poster.thumbnails[result.rawData.c_poster.thumbnails.length - 1].url : undefined;
  const mpaRating = isStringArray(result.rawData.c_mpaRating) ? result.rawData.c_mpaRating : undefined;
  const stars = isStringArray(result.rawData.c_stars) ? result.rawData.c_stars : undefined;
  const runtime = isString(result.rawData.c_runtime) ? result.rawData.c_runtime : undefined;

  function renderTitle(title: string) {
    return <div className="text-lg font-medium text-center whitespace-nowrap">{title}</div>
  }

  function renderMpaRating(ratings?: string[]) {
    return (ratings && ratings.length > 0 && (<div className="text-lg font-medium text-left">{`Rated: ${ratings[0]}`}</div>))
  }

  function renderRuntime(runtime?: string) {
    return (runtime && <div className="text-lg font-medium text-right">{`Runtime: ${runtime}`}</div>);
  }

  function renderStars(stars?: string[]){
    return (stars && stars.length > 0 && <div className="text-lg font-medium text-left">Starring: {stars.slice(0,3).map(star => ` ${star}`)}</div>)
  }

  return (
    <div className="flex flex-col justify-between border rounded-lg mb-4 p-4 shadow-sm ">
      <div className="flex text-gray-800 justify-center">
        {result.name && renderTitle(result.name)}
      </div>
      <div className="flex justify-center">
        <img src={moviePosterUrl}></img>
      </div>
      <div className="grid grid-cols-2  place-content-between">
        {renderMpaRating(mpaRating)}
        {renderRuntime(runtime)}
      </div>
      <div>
        {renderStars(stars)}
      </div>
    </div>
  );
}
import fs from 'node:fs'

interface ErrorWithMessage {
  message: string
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object'
    && error !== null
    && 'message' in error
    && typeof (error as Record<string, unknown>).message === 'string'
  )
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError))
    return maybeError

  try {
    return new Error(JSON.stringify(maybeError))
  }
  catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError))
  }
}

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message
}

export function joinUrl(baseUrl: string, pathUrl: string): string {
  return new URL(pathUrl, baseUrl).toString()
}

export async function checkFileExists(file: fs.PathLike) {
  try {
    await fs.promises.access(file, fs.constants.F_OK)
    return true
  }
  catch (error) {
    return false
  }
}

import {
  HttpStatus,
  HttpException,
  Logger,
  BadRequestException,
} from "@nestjs/common";
import axios from "axios";
import { Config } from "src/config";

import { randomBytes } from "crypto";

import * as crypto from "crypto";

interface FileValidationProps {
  supportedFormats: string[];
  maxFileSize: number;
  file;
}

const handleDbErrors = (err) => {
  //foreign key voiation error
  if (err.number === 547) {
    // Handle foreign key violation error here
    throw new BadRequestException("Invalid Foreign Key");
  }
  //duplicate value
  else if (err.number === 2627 || err.number === 2601) {
    throw new BadRequestException("DB duplicate error value already exists");
  }
};

export const handleErrorCatch = (err, source?: string) => {
  handleDbErrors(err);

  if (
    err.status === HttpStatus.NOT_FOUND ||
    err.status === HttpStatus.BAD_REQUEST ||
    err.status === HttpStatus.UNAUTHORIZED ||
    err.status === HttpStatus.FORBIDDEN ||
    err.status === HttpStatus.CONFLICT
  ) {
    throw new HttpException(
      {
        status: err.status,
        error: err.response.message || err.response.error,
      },
      err.status
    );
  }

  throw new HttpException(
    {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: `An error occured with the message: ${err.message}`,
    },
    HttpStatus.INTERNAL_SERVER_ERROR
  );
};

export const validateFile = (fileValidationProps: FileValidationProps) => {
  if (!fileValidationProps.file) {
    throw new BadRequestException("no file detected");
  }

  const checkFormat = fileValidationProps.supportedFormats.find(
    (format) => format == fileValidationProps.file.mimetype
  );

  if (!checkFormat) {
    throw new BadRequestException("file format not supported");
  }

  //900kb 900 000
  if (fileValidationProps.file.size > fileValidationProps.maxFileSize) {
    throw new BadRequestException("file too large");
  }
};

export const convertFileToBufferFromUrl = async (
  fileUrl: string
): Promise<Buffer> => {
  const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
  return Buffer.from(response.data, "binary");
};

export const convertFileToStreamFromUrl = async (
  fileUrl: string
): Promise<{ headers; data }> => {
  const response = await axios.get(fileUrl, { responseType: "stream" });
  return {
    headers: response.headers,
    data: response.data,
  };
};

export function generateVerificationToken(): string {
  // Generate a random 16-byte buffer using crypto
  const _randomBytes = randomBytes(16);

  // Convert the buffer to a hexadecimal string
  const token = _randomBytes.toString("hex");

  return token;
}

// export async function sendEmail(to, body: { subject; html }) {
//   try {
//     // const mailer = new SendChampApiWrapper();
//     const mailer = {};

//     await mailer.Email.sendHtmlEmail({
//       to,
//       ...body,
//     });
//   } catch (error) {
//     throw error;
//   }
// }

export function shuffleArray(list) {
  let mList = [...list];
  for (let i = mList.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));

    // Swap array[i] and array[j]
    [mList[i], mList[j]] = [mList[j], mList[i]];
  }

  return mList;
}

export function hashStringToUUID(inputString: string) {
  const hash = crypto.createHash("sha256");
  hash.update(inputString);
  const hashedString = hash.digest("hex");

  // Formatted as a valid UUID with 8-4-4-4-12 pattern
  const uuid = `${hashedString.substr(0, 8)}-${hashedString.substr(
    8,
    4
  )}-${hashedString.substr(12, 4)}-${hashedString.substr(
    16,
    4
  )}-${hashedString.substr(20, 12)}`;

  return uuid;
}

export function generateAuthorsResponse(
  rightAuthorIndex: number,
  shuffledResponses: Record<string, any>[]
) {
  let authorResponses = [];

  // can implement Algorithm Here
  for (let i = 0; i < 4; i++) {
    // pick first response
    if (i == rightAuthorIndex) {
      authorResponses.push({
        //added id for voting
        id: `${shuffledResponses[i]?.participant?.id}`,
        username: `${shuffledResponses[i]?.participant?.username}`,
        isCorrect: true,
      });
    } else {
      authorResponses.push({
        id: `${shuffledResponses[i]?.participant?.id}`,
        username: `${shuffledResponses[i]?.participant?.username}`,
        isCorrect: false,
      });
    }
  }

  // Todo shuffle author response
  return authorResponses;
}

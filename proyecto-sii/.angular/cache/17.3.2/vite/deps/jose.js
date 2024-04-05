import {
  __async,
  __asyncGenerator,
  __await,
  __export,
  __objRest,
  __spreadProps,
  __spreadValues,
  __superGet
} from "./chunk-2W45HU62.js";

// node_modules/jose/dist/browser/runtime/webcrypto.js
var webcrypto_default = crypto;
var isCryptoKey = (key) => key instanceof CryptoKey;

// node_modules/jose/dist/browser/runtime/digest.js
var digest = (algorithm, data) => __async(void 0, null, function* () {
  const subtleDigest = `SHA-${algorithm.slice(-3)}`;
  return new Uint8Array(yield webcrypto_default.subtle.digest(subtleDigest, data));
});
var digest_default = digest;

// node_modules/jose/dist/browser/lib/buffer_utils.js
var encoder = new TextEncoder();
var decoder = new TextDecoder();
var MAX_INT32 = 2 ** 32;
function concat(...buffers) {
  const size = buffers.reduce((acc, { length }) => acc + length, 0);
  const buf = new Uint8Array(size);
  let i = 0;
  for (const buffer of buffers) {
    buf.set(buffer, i);
    i += buffer.length;
  }
  return buf;
}
function p2s(alg, p2sInput) {
  return concat(encoder.encode(alg), new Uint8Array([0]), p2sInput);
}
function writeUInt32BE(buf, value, offset) {
  if (value < 0 || value >= MAX_INT32) {
    throw new RangeError(`value must be >= 0 and <= ${MAX_INT32 - 1}. Received ${value}`);
  }
  buf.set([value >>> 24, value >>> 16, value >>> 8, value & 255], offset);
}
function uint64be(value) {
  const high = Math.floor(value / MAX_INT32);
  const low = value % MAX_INT32;
  const buf = new Uint8Array(8);
  writeUInt32BE(buf, high, 0);
  writeUInt32BE(buf, low, 4);
  return buf;
}
function uint32be(value) {
  const buf = new Uint8Array(4);
  writeUInt32BE(buf, value);
  return buf;
}
function lengthAndInput(input) {
  return concat(uint32be(input.length), input);
}
function concatKdf(secret, bits, value) {
  return __async(this, null, function* () {
    const iterations = Math.ceil((bits >> 3) / 32);
    const res = new Uint8Array(iterations * 32);
    for (let iter = 0; iter < iterations; iter++) {
      const buf = new Uint8Array(4 + secret.length + value.length);
      buf.set(uint32be(iter + 1));
      buf.set(secret, 4);
      buf.set(value, 4 + secret.length);
      res.set(yield digest_default("sha256", buf), iter * 32);
    }
    return res.slice(0, bits >> 3);
  });
}

// node_modules/jose/dist/browser/runtime/base64url.js
var encodeBase64 = (input) => {
  let unencoded = input;
  if (typeof unencoded === "string") {
    unencoded = encoder.encode(unencoded);
  }
  const CHUNK_SIZE = 32768;
  const arr = [];
  for (let i = 0; i < unencoded.length; i += CHUNK_SIZE) {
    arr.push(String.fromCharCode.apply(null, unencoded.subarray(i, i + CHUNK_SIZE)));
  }
  return btoa(arr.join(""));
};
var encode = (input) => {
  return encodeBase64(input).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
};
var decodeBase64 = (encoded) => {
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};
var decode = (input) => {
  let encoded = input;
  if (encoded instanceof Uint8Array) {
    encoded = decoder.decode(encoded);
  }
  encoded = encoded.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
  try {
    return decodeBase64(encoded);
  } catch {
    throw new TypeError("The input to be decoded is not correctly encoded.");
  }
};

// node_modules/jose/dist/browser/util/errors.js
var errors_exports = {};
__export(errors_exports, {
  JOSEAlgNotAllowed: () => JOSEAlgNotAllowed,
  JOSEError: () => JOSEError,
  JOSENotSupported: () => JOSENotSupported,
  JWEDecryptionFailed: () => JWEDecryptionFailed,
  JWEInvalid: () => JWEInvalid,
  JWKInvalid: () => JWKInvalid,
  JWKSInvalid: () => JWKSInvalid,
  JWKSMultipleMatchingKeys: () => JWKSMultipleMatchingKeys,
  JWKSNoMatchingKey: () => JWKSNoMatchingKey,
  JWKSTimeout: () => JWKSTimeout,
  JWSInvalid: () => JWSInvalid,
  JWSSignatureVerificationFailed: () => JWSSignatureVerificationFailed,
  JWTClaimValidationFailed: () => JWTClaimValidationFailed,
  JWTExpired: () => JWTExpired,
  JWTInvalid: () => JWTInvalid
});
var JOSEError = class extends Error {
  static get code() {
    return "ERR_JOSE_GENERIC";
  }
  constructor(message2) {
    super(message2);
    this.code = "ERR_JOSE_GENERIC";
    this.name = this.constructor.name;
    Error.captureStackTrace?.(this, this.constructor);
  }
};
var JWTClaimValidationFailed = class extends JOSEError {
  static get code() {
    return "ERR_JWT_CLAIM_VALIDATION_FAILED";
  }
  constructor(message2, claim = "unspecified", reason = "unspecified") {
    super(message2);
    this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
    this.claim = claim;
    this.reason = reason;
  }
};
var JWTExpired = class extends JOSEError {
  static get code() {
    return "ERR_JWT_EXPIRED";
  }
  constructor(message2, claim = "unspecified", reason = "unspecified") {
    super(message2);
    this.code = "ERR_JWT_EXPIRED";
    this.claim = claim;
    this.reason = reason;
  }
};
var JOSEAlgNotAllowed = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
  }
  static get code() {
    return "ERR_JOSE_ALG_NOT_ALLOWED";
  }
};
var JOSENotSupported = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JOSE_NOT_SUPPORTED";
  }
  static get code() {
    return "ERR_JOSE_NOT_SUPPORTED";
  }
};
var JWEDecryptionFailed = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWE_DECRYPTION_FAILED";
    this.message = "decryption operation failed";
  }
  static get code() {
    return "ERR_JWE_DECRYPTION_FAILED";
  }
};
var JWEInvalid = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWE_INVALID";
  }
  static get code() {
    return "ERR_JWE_INVALID";
  }
};
var JWSInvalid = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWS_INVALID";
  }
  static get code() {
    return "ERR_JWS_INVALID";
  }
};
var JWTInvalid = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWT_INVALID";
  }
  static get code() {
    return "ERR_JWT_INVALID";
  }
};
var JWKInvalid = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWK_INVALID";
  }
  static get code() {
    return "ERR_JWK_INVALID";
  }
};
var JWKSInvalid = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWKS_INVALID";
  }
  static get code() {
    return "ERR_JWKS_INVALID";
  }
};
var JWKSNoMatchingKey = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWKS_NO_MATCHING_KEY";
    this.message = "no applicable key found in the JSON Web Key Set";
  }
  static get code() {
    return "ERR_JWKS_NO_MATCHING_KEY";
  }
};
var JWKSMultipleMatchingKeys = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
    this.message = "multiple matching keys found in the JSON Web Key Set";
  }
  static get code() {
    return "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
  }
};
var JWKSTimeout = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWKS_TIMEOUT";
    this.message = "request timed out";
  }
  static get code() {
    return "ERR_JWKS_TIMEOUT";
  }
};
var JWSSignatureVerificationFailed = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
    this.message = "signature verification failed";
  }
  static get code() {
    return "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  }
};

// node_modules/jose/dist/browser/runtime/random.js
var random_default = webcrypto_default.getRandomValues.bind(webcrypto_default);

// node_modules/jose/dist/browser/lib/iv.js
function bitLength(alg) {
  switch (alg) {
    case "A128GCM":
    case "A128GCMKW":
    case "A192GCM":
    case "A192GCMKW":
    case "A256GCM":
    case "A256GCMKW":
      return 96;
    case "A128CBC-HS256":
    case "A192CBC-HS384":
    case "A256CBC-HS512":
      return 128;
    default:
      throw new JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
  }
}
var iv_default = (alg) => random_default(new Uint8Array(bitLength(alg) >> 3));

// node_modules/jose/dist/browser/lib/check_iv_length.js
var checkIvLength = (enc, iv) => {
  if (iv.length << 3 !== bitLength(enc)) {
    throw new JWEInvalid("Invalid Initialization Vector length");
  }
};
var check_iv_length_default = checkIvLength;

// node_modules/jose/dist/browser/runtime/check_cek_length.js
var checkCekLength = (cek, expected) => {
  const actual = cek.byteLength << 3;
  if (actual !== expected) {
    throw new JWEInvalid(`Invalid Content Encryption Key length. Expected ${expected} bits, got ${actual} bits`);
  }
};
var check_cek_length_default = checkCekLength;

// node_modules/jose/dist/browser/runtime/timing_safe_equal.js
var timingSafeEqual = (a, b) => {
  if (!(a instanceof Uint8Array)) {
    throw new TypeError("First argument must be a buffer");
  }
  if (!(b instanceof Uint8Array)) {
    throw new TypeError("Second argument must be a buffer");
  }
  if (a.length !== b.length) {
    throw new TypeError("Input buffers must have the same length");
  }
  const len = a.length;
  let out = 0;
  let i = -1;
  while (++i < len) {
    out |= a[i] ^ b[i];
  }
  return out === 0;
};
var timing_safe_equal_default = timingSafeEqual;

// node_modules/jose/dist/browser/lib/crypto_key.js
function unusable(name, prop = "algorithm.name") {
  return new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
}
function isAlgorithm(algorithm, name) {
  return algorithm.name === name;
}
function getHashLength(hash) {
  return parseInt(hash.name.slice(4), 10);
}
function getNamedCurve(alg) {
  switch (alg) {
    case "ES256":
      return "P-256";
    case "ES384":
      return "P-384";
    case "ES512":
      return "P-521";
    default:
      throw new Error("unreachable");
  }
}
function checkUsage(key, usages) {
  if (usages.length && !usages.some((expected) => key.usages.includes(expected))) {
    let msg = "CryptoKey does not support this operation, its usages must include ";
    if (usages.length > 2) {
      const last = usages.pop();
      msg += `one of ${usages.join(", ")}, or ${last}.`;
    } else if (usages.length === 2) {
      msg += `one of ${usages[0]} or ${usages[1]}.`;
    } else {
      msg += `${usages[0]}.`;
    }
    throw new TypeError(msg);
  }
}
function checkSigCryptoKey(key, alg, ...usages) {
  switch (alg) {
    case "HS256":
    case "HS384":
    case "HS512": {
      if (!isAlgorithm(key.algorithm, "HMAC"))
        throw unusable("HMAC");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "RS256":
    case "RS384":
    case "RS512": {
      if (!isAlgorithm(key.algorithm, "RSASSA-PKCS1-v1_5"))
        throw unusable("RSASSA-PKCS1-v1_5");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "PS256":
    case "PS384":
    case "PS512": {
      if (!isAlgorithm(key.algorithm, "RSA-PSS"))
        throw unusable("RSA-PSS");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "EdDSA": {
      if (key.algorithm.name !== "Ed25519" && key.algorithm.name !== "Ed448") {
        throw unusable("Ed25519 or Ed448");
      }
      break;
    }
    case "ES256":
    case "ES384":
    case "ES512": {
      if (!isAlgorithm(key.algorithm, "ECDSA"))
        throw unusable("ECDSA");
      const expected = getNamedCurve(alg);
      const actual = key.algorithm.namedCurve;
      if (actual !== expected)
        throw unusable(expected, "algorithm.namedCurve");
      break;
    }
    default:
      throw new TypeError("CryptoKey does not support this operation");
  }
  checkUsage(key, usages);
}
function checkEncCryptoKey(key, alg, ...usages) {
  switch (alg) {
    case "A128GCM":
    case "A192GCM":
    case "A256GCM": {
      if (!isAlgorithm(key.algorithm, "AES-GCM"))
        throw unusable("AES-GCM");
      const expected = parseInt(alg.slice(1, 4), 10);
      const actual = key.algorithm.length;
      if (actual !== expected)
        throw unusable(expected, "algorithm.length");
      break;
    }
    case "A128KW":
    case "A192KW":
    case "A256KW": {
      if (!isAlgorithm(key.algorithm, "AES-KW"))
        throw unusable("AES-KW");
      const expected = parseInt(alg.slice(1, 4), 10);
      const actual = key.algorithm.length;
      if (actual !== expected)
        throw unusable(expected, "algorithm.length");
      break;
    }
    case "ECDH": {
      switch (key.algorithm.name) {
        case "ECDH":
        case "X25519":
        case "X448":
          break;
        default:
          throw unusable("ECDH, X25519, or X448");
      }
      break;
    }
    case "PBES2-HS256+A128KW":
    case "PBES2-HS384+A192KW":
    case "PBES2-HS512+A256KW":
      if (!isAlgorithm(key.algorithm, "PBKDF2"))
        throw unusable("PBKDF2");
      break;
    case "RSA-OAEP":
    case "RSA-OAEP-256":
    case "RSA-OAEP-384":
    case "RSA-OAEP-512": {
      if (!isAlgorithm(key.algorithm, "RSA-OAEP"))
        throw unusable("RSA-OAEP");
      const expected = parseInt(alg.slice(9), 10) || 1;
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    default:
      throw new TypeError("CryptoKey does not support this operation");
  }
  checkUsage(key, usages);
}

// node_modules/jose/dist/browser/lib/invalid_key_input.js
function message(msg, actual, ...types2) {
  if (types2.length > 2) {
    const last = types2.pop();
    msg += `one of type ${types2.join(", ")}, or ${last}.`;
  } else if (types2.length === 2) {
    msg += `one of type ${types2[0]} or ${types2[1]}.`;
  } else {
    msg += `of type ${types2[0]}.`;
  }
  if (actual == null) {
    msg += ` Received ${actual}`;
  } else if (typeof actual === "function" && actual.name) {
    msg += ` Received function ${actual.name}`;
  } else if (typeof actual === "object" && actual != null) {
    if (actual.constructor?.name) {
      msg += ` Received an instance of ${actual.constructor.name}`;
    }
  }
  return msg;
}
var invalid_key_input_default = (actual, ...types2) => {
  return message("Key must be ", actual, ...types2);
};
function withAlg(alg, actual, ...types2) {
  return message(`Key for the ${alg} algorithm must be `, actual, ...types2);
}

// node_modules/jose/dist/browser/runtime/is_key_like.js
var is_key_like_default = (key) => {
  return isCryptoKey(key);
};
var types = ["CryptoKey"];

// node_modules/jose/dist/browser/runtime/decrypt.js
function cbcDecrypt(enc, cek, ciphertext, iv, tag, aad) {
  return __async(this, null, function* () {
    if (!(cek instanceof Uint8Array)) {
      throw new TypeError(invalid_key_input_default(cek, "Uint8Array"));
    }
    const keySize = parseInt(enc.slice(1, 4), 10);
    const encKey = yield webcrypto_default.subtle.importKey("raw", cek.subarray(keySize >> 3), "AES-CBC", false, ["decrypt"]);
    const macKey = yield webcrypto_default.subtle.importKey("raw", cek.subarray(0, keySize >> 3), {
      hash: `SHA-${keySize << 1}`,
      name: "HMAC"
    }, false, ["sign"]);
    const macData = concat(aad, iv, ciphertext, uint64be(aad.length << 3));
    const expectedTag = new Uint8Array((yield webcrypto_default.subtle.sign("HMAC", macKey, macData)).slice(0, keySize >> 3));
    let macCheckPassed;
    try {
      macCheckPassed = timing_safe_equal_default(tag, expectedTag);
    } catch {
    }
    if (!macCheckPassed) {
      throw new JWEDecryptionFailed();
    }
    let plaintext;
    try {
      plaintext = new Uint8Array(yield webcrypto_default.subtle.decrypt({ iv, name: "AES-CBC" }, encKey, ciphertext));
    } catch {
    }
    if (!plaintext) {
      throw new JWEDecryptionFailed();
    }
    return plaintext;
  });
}
function gcmDecrypt(enc, cek, ciphertext, iv, tag, aad) {
  return __async(this, null, function* () {
    let encKey;
    if (cek instanceof Uint8Array) {
      encKey = yield webcrypto_default.subtle.importKey("raw", cek, "AES-GCM", false, ["decrypt"]);
    } else {
      checkEncCryptoKey(cek, enc, "decrypt");
      encKey = cek;
    }
    try {
      return new Uint8Array(yield webcrypto_default.subtle.decrypt({
        additionalData: aad,
        iv,
        name: "AES-GCM",
        tagLength: 128
      }, encKey, concat(ciphertext, tag)));
    } catch {
      throw new JWEDecryptionFailed();
    }
  });
}
var decrypt = (enc, cek, ciphertext, iv, tag, aad) => __async(void 0, null, function* () {
  if (!isCryptoKey(cek) && !(cek instanceof Uint8Array)) {
    throw new TypeError(invalid_key_input_default(cek, ...types, "Uint8Array"));
  }
  if (!iv) {
    throw new JWEInvalid("JWE Initialization Vector missing");
  }
  if (!tag) {
    throw new JWEInvalid("JWE Authentication Tag missing");
  }
  check_iv_length_default(enc, iv);
  switch (enc) {
    case "A128CBC-HS256":
    case "A192CBC-HS384":
    case "A256CBC-HS512":
      if (cek instanceof Uint8Array)
        check_cek_length_default(cek, parseInt(enc.slice(-3), 10));
      return cbcDecrypt(enc, cek, ciphertext, iv, tag, aad);
    case "A128GCM":
    case "A192GCM":
    case "A256GCM":
      if (cek instanceof Uint8Array)
        check_cek_length_default(cek, parseInt(enc.slice(1, 4), 10));
      return gcmDecrypt(enc, cek, ciphertext, iv, tag, aad);
    default:
      throw new JOSENotSupported("Unsupported JWE Content Encryption Algorithm");
  }
});
var decrypt_default = decrypt;

// node_modules/jose/dist/browser/lib/is_disjoint.js
var isDisjoint = (...headers) => {
  const sources = headers.filter(Boolean);
  if (sources.length === 0 || sources.length === 1) {
    return true;
  }
  let acc;
  for (const header of sources) {
    const parameters = Object.keys(header);
    if (!acc || acc.size === 0) {
      acc = new Set(parameters);
      continue;
    }
    for (const parameter of parameters) {
      if (acc.has(parameter)) {
        return false;
      }
      acc.add(parameter);
    }
  }
  return true;
};
var is_disjoint_default = isDisjoint;

// node_modules/jose/dist/browser/lib/is_object.js
function isObjectLike(value) {
  return typeof value === "object" && value !== null;
}
function isObject(input) {
  if (!isObjectLike(input) || Object.prototype.toString.call(input) !== "[object Object]") {
    return false;
  }
  if (Object.getPrototypeOf(input) === null) {
    return true;
  }
  let proto = input;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(input) === proto;
}

// node_modules/jose/dist/browser/runtime/bogus.js
var bogusWebCrypto = [
  { hash: "SHA-256", name: "HMAC" },
  true,
  ["sign"]
];
var bogus_default = bogusWebCrypto;

// node_modules/jose/dist/browser/runtime/aeskw.js
function checkKeySize(key, alg) {
  if (key.algorithm.length !== parseInt(alg.slice(1, 4), 10)) {
    throw new TypeError(`Invalid key size for alg: ${alg}`);
  }
}
function getCryptoKey(key, alg, usage) {
  if (isCryptoKey(key)) {
    checkEncCryptoKey(key, alg, usage);
    return key;
  }
  if (key instanceof Uint8Array) {
    return webcrypto_default.subtle.importKey("raw", key, "AES-KW", true, [usage]);
  }
  throw new TypeError(invalid_key_input_default(key, ...types, "Uint8Array"));
}
var wrap = (alg, key, cek) => __async(void 0, null, function* () {
  const cryptoKey = yield getCryptoKey(key, alg, "wrapKey");
  checkKeySize(cryptoKey, alg);
  const cryptoKeyCek = yield webcrypto_default.subtle.importKey("raw", cek, ...bogus_default);
  return new Uint8Array(yield webcrypto_default.subtle.wrapKey("raw", cryptoKeyCek, cryptoKey, "AES-KW"));
});
var unwrap = (alg, key, encryptedKey) => __async(void 0, null, function* () {
  const cryptoKey = yield getCryptoKey(key, alg, "unwrapKey");
  checkKeySize(cryptoKey, alg);
  const cryptoKeyCek = yield webcrypto_default.subtle.unwrapKey("raw", encryptedKey, cryptoKey, "AES-KW", ...bogus_default);
  return new Uint8Array(yield webcrypto_default.subtle.exportKey("raw", cryptoKeyCek));
});

// node_modules/jose/dist/browser/runtime/ecdhes.js
function deriveKey(_0, _1, _2, _3) {
  return __async(this, arguments, function* (publicKey, privateKey, algorithm, keyLength, apu = new Uint8Array(0), apv = new Uint8Array(0)) {
    if (!isCryptoKey(publicKey)) {
      throw new TypeError(invalid_key_input_default(publicKey, ...types));
    }
    checkEncCryptoKey(publicKey, "ECDH");
    if (!isCryptoKey(privateKey)) {
      throw new TypeError(invalid_key_input_default(privateKey, ...types));
    }
    checkEncCryptoKey(privateKey, "ECDH", "deriveBits");
    const value = concat(lengthAndInput(encoder.encode(algorithm)), lengthAndInput(apu), lengthAndInput(apv), uint32be(keyLength));
    let length;
    if (publicKey.algorithm.name === "X25519") {
      length = 256;
    } else if (publicKey.algorithm.name === "X448") {
      length = 448;
    } else {
      length = Math.ceil(parseInt(publicKey.algorithm.namedCurve.substr(-3), 10) / 8) << 3;
    }
    const sharedSecret = new Uint8Array(yield webcrypto_default.subtle.deriveBits({
      name: publicKey.algorithm.name,
      public: publicKey
    }, privateKey, length));
    return concatKdf(sharedSecret, keyLength, value);
  });
}
function generateEpk(key) {
  return __async(this, null, function* () {
    if (!isCryptoKey(key)) {
      throw new TypeError(invalid_key_input_default(key, ...types));
    }
    return webcrypto_default.subtle.generateKey(key.algorithm, true, ["deriveBits"]);
  });
}
function ecdhAllowed(key) {
  if (!isCryptoKey(key)) {
    throw new TypeError(invalid_key_input_default(key, ...types));
  }
  return ["P-256", "P-384", "P-521"].includes(key.algorithm.namedCurve) || key.algorithm.name === "X25519" || key.algorithm.name === "X448";
}

// node_modules/jose/dist/browser/lib/check_p2s.js
function checkP2s(p2s2) {
  if (!(p2s2 instanceof Uint8Array) || p2s2.length < 8) {
    throw new JWEInvalid("PBES2 Salt Input must be 8 or more octets");
  }
}

// node_modules/jose/dist/browser/runtime/pbes2kw.js
function getCryptoKey2(key, alg) {
  if (key instanceof Uint8Array) {
    return webcrypto_default.subtle.importKey("raw", key, "PBKDF2", false, ["deriveBits"]);
  }
  if (isCryptoKey(key)) {
    checkEncCryptoKey(key, alg, "deriveBits", "deriveKey");
    return key;
  }
  throw new TypeError(invalid_key_input_default(key, ...types, "Uint8Array"));
}
function deriveKey2(p2s2, alg, p2c, key) {
  return __async(this, null, function* () {
    checkP2s(p2s2);
    const salt = p2s(alg, p2s2);
    const keylen = parseInt(alg.slice(13, 16), 10);
    const subtleAlg = {
      hash: `SHA-${alg.slice(8, 11)}`,
      iterations: p2c,
      name: "PBKDF2",
      salt
    };
    const wrapAlg = {
      length: keylen,
      name: "AES-KW"
    };
    const cryptoKey = yield getCryptoKey2(key, alg);
    if (cryptoKey.usages.includes("deriveBits")) {
      return new Uint8Array(yield webcrypto_default.subtle.deriveBits(subtleAlg, cryptoKey, keylen));
    }
    if (cryptoKey.usages.includes("deriveKey")) {
      return webcrypto_default.subtle.deriveKey(subtleAlg, cryptoKey, wrapAlg, false, ["wrapKey", "unwrapKey"]);
    }
    throw new TypeError('PBKDF2 key "usages" must include "deriveBits" or "deriveKey"');
  });
}
var encrypt = (_0, _1, _2, ..._3) => __async(void 0, [_0, _1, _2, ..._3], function* (alg, key, cek, p2c = 2048, p2s2 = random_default(new Uint8Array(16))) {
  const derived = yield deriveKey2(p2s2, alg, p2c, key);
  const encryptedKey = yield wrap(alg.slice(-6), derived, cek);
  return { encryptedKey, p2c, p2s: encode(p2s2) };
});
var decrypt2 = (alg, key, encryptedKey, p2c, p2s2) => __async(void 0, null, function* () {
  const derived = yield deriveKey2(p2s2, alg, p2c, key);
  return unwrap(alg.slice(-6), derived, encryptedKey);
});

// node_modules/jose/dist/browser/runtime/subtle_rsaes.js
function subtleRsaEs(alg) {
  switch (alg) {
    case "RSA-OAEP":
    case "RSA-OAEP-256":
    case "RSA-OAEP-384":
    case "RSA-OAEP-512":
      return "RSA-OAEP";
    default:
      throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
  }
}

// node_modules/jose/dist/browser/runtime/check_key_length.js
var check_key_length_default = (alg, key) => {
  if (alg.startsWith("RS") || alg.startsWith("PS")) {
    const { modulusLength } = key.algorithm;
    if (typeof modulusLength !== "number" || modulusLength < 2048) {
      throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
    }
  }
};

// node_modules/jose/dist/browser/runtime/rsaes.js
var encrypt2 = (alg, key, cek) => __async(void 0, null, function* () {
  if (!isCryptoKey(key)) {
    throw new TypeError(invalid_key_input_default(key, ...types));
  }
  checkEncCryptoKey(key, alg, "encrypt", "wrapKey");
  check_key_length_default(alg, key);
  if (key.usages.includes("encrypt")) {
    return new Uint8Array(yield webcrypto_default.subtle.encrypt(subtleRsaEs(alg), key, cek));
  }
  if (key.usages.includes("wrapKey")) {
    const cryptoKeyCek = yield webcrypto_default.subtle.importKey("raw", cek, ...bogus_default);
    return new Uint8Array(yield webcrypto_default.subtle.wrapKey("raw", cryptoKeyCek, key, subtleRsaEs(alg)));
  }
  throw new TypeError('RSA-OAEP key "usages" must include "encrypt" or "wrapKey" for this operation');
});
var decrypt3 = (alg, key, encryptedKey) => __async(void 0, null, function* () {
  if (!isCryptoKey(key)) {
    throw new TypeError(invalid_key_input_default(key, ...types));
  }
  checkEncCryptoKey(key, alg, "decrypt", "unwrapKey");
  check_key_length_default(alg, key);
  if (key.usages.includes("decrypt")) {
    return new Uint8Array(yield webcrypto_default.subtle.decrypt(subtleRsaEs(alg), key, encryptedKey));
  }
  if (key.usages.includes("unwrapKey")) {
    const cryptoKeyCek = yield webcrypto_default.subtle.unwrapKey("raw", encryptedKey, key, subtleRsaEs(alg), ...bogus_default);
    return new Uint8Array(yield webcrypto_default.subtle.exportKey("raw", cryptoKeyCek));
  }
  throw new TypeError('RSA-OAEP key "usages" must include "decrypt" or "unwrapKey" for this operation');
});

// node_modules/jose/dist/browser/lib/cek.js
function bitLength2(alg) {
  switch (alg) {
    case "A128GCM":
      return 128;
    case "A192GCM":
      return 192;
    case "A256GCM":
    case "A128CBC-HS256":
      return 256;
    case "A192CBC-HS384":
      return 384;
    case "A256CBC-HS512":
      return 512;
    default:
      throw new JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
  }
}
var cek_default = (alg) => random_default(new Uint8Array(bitLength2(alg) >> 3));

// node_modules/jose/dist/browser/lib/format_pem.js
var format_pem_default = (b64, descriptor) => {
  const newlined = (b64.match(/.{1,64}/g) || []).join("\n");
  return `-----BEGIN ${descriptor}-----
${newlined}
-----END ${descriptor}-----`;
};

// node_modules/jose/dist/browser/runtime/asn1.js
var genericExport = (keyType, keyFormat, key) => __async(void 0, null, function* () {
  if (!isCryptoKey(key)) {
    throw new TypeError(invalid_key_input_default(key, ...types));
  }
  if (!key.extractable) {
    throw new TypeError("CryptoKey is not extractable");
  }
  if (key.type !== keyType) {
    throw new TypeError(`key is not a ${keyType} key`);
  }
  return format_pem_default(encodeBase64(new Uint8Array(yield webcrypto_default.subtle.exportKey(keyFormat, key))), `${keyType.toUpperCase()} KEY`);
});
var toSPKI = (key) => {
  return genericExport("public", "spki", key);
};
var toPKCS8 = (key) => {
  return genericExport("private", "pkcs8", key);
};
var findOid = (keyData, oid, from = 0) => {
  if (from === 0) {
    oid.unshift(oid.length);
    oid.unshift(6);
  }
  const i = keyData.indexOf(oid[0], from);
  if (i === -1)
    return false;
  const sub = keyData.subarray(i, i + oid.length);
  if (sub.length !== oid.length)
    return false;
  return sub.every((value, index) => value === oid[index]) || findOid(keyData, oid, i + 1);
};
var getNamedCurve2 = (keyData) => {
  switch (true) {
    case findOid(keyData, [42, 134, 72, 206, 61, 3, 1, 7]):
      return "P-256";
    case findOid(keyData, [43, 129, 4, 0, 34]):
      return "P-384";
    case findOid(keyData, [43, 129, 4, 0, 35]):
      return "P-521";
    case findOid(keyData, [43, 101, 110]):
      return "X25519";
    case findOid(keyData, [43, 101, 111]):
      return "X448";
    case findOid(keyData, [43, 101, 112]):
      return "Ed25519";
    case findOid(keyData, [43, 101, 113]):
      return "Ed448";
    default:
      throw new JOSENotSupported("Invalid or unsupported EC Key Curve or OKP Key Sub Type");
  }
};
var genericImport = (replace, keyFormat, pem, alg, options) => __async(void 0, null, function* () {
  let algorithm;
  let keyUsages;
  const keyData = new Uint8Array(atob(pem.replace(replace, "")).split("").map((c) => c.charCodeAt(0)));
  const isPublic = keyFormat === "spki";
  switch (alg) {
    case "PS256":
    case "PS384":
    case "PS512":
      algorithm = { name: "RSA-PSS", hash: `SHA-${alg.slice(-3)}` };
      keyUsages = isPublic ? ["verify"] : ["sign"];
      break;
    case "RS256":
    case "RS384":
    case "RS512":
      algorithm = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${alg.slice(-3)}` };
      keyUsages = isPublic ? ["verify"] : ["sign"];
      break;
    case "RSA-OAEP":
    case "RSA-OAEP-256":
    case "RSA-OAEP-384":
    case "RSA-OAEP-512":
      algorithm = {
        name: "RSA-OAEP",
        hash: `SHA-${parseInt(alg.slice(-3), 10) || 1}`
      };
      keyUsages = isPublic ? ["encrypt", "wrapKey"] : ["decrypt", "unwrapKey"];
      break;
    case "ES256":
      algorithm = { name: "ECDSA", namedCurve: "P-256" };
      keyUsages = isPublic ? ["verify"] : ["sign"];
      break;
    case "ES384":
      algorithm = { name: "ECDSA", namedCurve: "P-384" };
      keyUsages = isPublic ? ["verify"] : ["sign"];
      break;
    case "ES512":
      algorithm = { name: "ECDSA", namedCurve: "P-521" };
      keyUsages = isPublic ? ["verify"] : ["sign"];
      break;
    case "ECDH-ES":
    case "ECDH-ES+A128KW":
    case "ECDH-ES+A192KW":
    case "ECDH-ES+A256KW": {
      const namedCurve = getNamedCurve2(keyData);
      algorithm = namedCurve.startsWith("P-") ? { name: "ECDH", namedCurve } : { name: namedCurve };
      keyUsages = isPublic ? [] : ["deriveBits"];
      break;
    }
    case "EdDSA":
      algorithm = { name: getNamedCurve2(keyData) };
      keyUsages = isPublic ? ["verify"] : ["sign"];
      break;
    default:
      throw new JOSENotSupported('Invalid or unsupported "alg" (Algorithm) value');
  }
  return webcrypto_default.subtle.importKey(keyFormat, keyData, algorithm, options?.extractable ?? false, keyUsages);
});
var fromPKCS8 = (pem, alg, options) => {
  return genericImport(/(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g, "pkcs8", pem, alg, options);
};
var fromSPKI = (pem, alg, options) => {
  return genericImport(/(?:-----(?:BEGIN|END) PUBLIC KEY-----|\s)/g, "spki", pem, alg, options);
};
function getElement(seq) {
  const result = [];
  let next = 0;
  while (next < seq.length) {
    const nextPart = parseElement(seq.subarray(next));
    result.push(nextPart);
    next += nextPart.byteLength;
  }
  return result;
}
function parseElement(bytes) {
  let position = 0;
  let tag = bytes[0] & 31;
  position++;
  if (tag === 31) {
    tag = 0;
    while (bytes[position] >= 128) {
      tag = tag * 128 + bytes[position] - 128;
      position++;
    }
    tag = tag * 128 + bytes[position] - 128;
    position++;
  }
  let length = 0;
  if (bytes[position] < 128) {
    length = bytes[position];
    position++;
  } else if (length === 128) {
    length = 0;
    while (bytes[position + length] !== 0 || bytes[position + length + 1] !== 0) {
      if (length > bytes.byteLength) {
        throw new TypeError("invalid indefinite form length");
      }
      length++;
    }
    const byteLength2 = position + length + 2;
    return {
      byteLength: byteLength2,
      contents: bytes.subarray(position, position + length),
      raw: bytes.subarray(0, byteLength2)
    };
  } else {
    const numberOfDigits = bytes[position] & 127;
    position++;
    length = 0;
    for (let i = 0; i < numberOfDigits; i++) {
      length = length * 256 + bytes[position];
      position++;
    }
  }
  const byteLength = position + length;
  return {
    byteLength,
    contents: bytes.subarray(position, byteLength),
    raw: bytes.subarray(0, byteLength)
  };
}
function spkiFromX509(buf) {
  const tbsCertificate = getElement(getElement(parseElement(buf).contents)[0].contents);
  return encodeBase64(tbsCertificate[tbsCertificate[0].raw[0] === 160 ? 6 : 5].raw);
}
function getSPKI(x509) {
  const pem = x509.replace(/(?:-----(?:BEGIN|END) CERTIFICATE-----|\s)/g, "");
  const raw = decodeBase64(pem);
  return format_pem_default(spkiFromX509(raw), "PUBLIC KEY");
}
var fromX509 = (pem, alg, options) => {
  let spki;
  try {
    spki = getSPKI(pem);
  } catch (cause) {
    throw new TypeError("Failed to parse the X.509 certificate", { cause });
  }
  return fromSPKI(spki, alg, options);
};

// node_modules/jose/dist/browser/runtime/jwk_to_key.js
function subtleMapping(jwk) {
  let algorithm;
  let keyUsages;
  switch (jwk.kty) {
    case "RSA": {
      switch (jwk.alg) {
        case "PS256":
        case "PS384":
        case "PS512":
          algorithm = { name: "RSA-PSS", hash: `SHA-${jwk.alg.slice(-3)}` };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "RS256":
        case "RS384":
        case "RS512":
          algorithm = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${jwk.alg.slice(-3)}` };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
          algorithm = {
            name: "RSA-OAEP",
            hash: `SHA-${parseInt(jwk.alg.slice(-3), 10) || 1}`
          };
          keyUsages = jwk.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
          break;
        default:
          throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    case "EC": {
      switch (jwk.alg) {
        case "ES256":
          algorithm = { name: "ECDSA", namedCurve: "P-256" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ES384":
          algorithm = { name: "ECDSA", namedCurve: "P-384" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ES512":
          algorithm = { name: "ECDSA", namedCurve: "P-521" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          algorithm = { name: "ECDH", namedCurve: jwk.crv };
          keyUsages = jwk.d ? ["deriveBits"] : [];
          break;
        default:
          throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    case "OKP": {
      switch (jwk.alg) {
        case "EdDSA":
          algorithm = { name: jwk.crv };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          algorithm = { name: jwk.crv };
          keyUsages = jwk.d ? ["deriveBits"] : [];
          break;
        default:
          throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    default:
      throw new JOSENotSupported('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
  }
  return { algorithm, keyUsages };
}
var parse = (jwk) => __async(void 0, null, function* () {
  if (!jwk.alg) {
    throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
  }
  const { algorithm, keyUsages } = subtleMapping(jwk);
  const rest = [
    algorithm,
    jwk.ext ?? false,
    jwk.key_ops ?? keyUsages
  ];
  const keyData = __spreadValues({}, jwk);
  delete keyData.alg;
  delete keyData.use;
  return webcrypto_default.subtle.importKey("jwk", keyData, ...rest);
});
var jwk_to_key_default = parse;

// node_modules/jose/dist/browser/key/import.js
function importSPKI(spki, alg, options) {
  return __async(this, null, function* () {
    if (typeof spki !== "string" || spki.indexOf("-----BEGIN PUBLIC KEY-----") !== 0) {
      throw new TypeError('"spki" must be SPKI formatted string');
    }
    return fromSPKI(spki, alg, options);
  });
}
function importX509(x509, alg, options) {
  return __async(this, null, function* () {
    if (typeof x509 !== "string" || x509.indexOf("-----BEGIN CERTIFICATE-----") !== 0) {
      throw new TypeError('"x509" must be X.509 formatted string');
    }
    return fromX509(x509, alg, options);
  });
}
function importPKCS8(pkcs8, alg, options) {
  return __async(this, null, function* () {
    if (typeof pkcs8 !== "string" || pkcs8.indexOf("-----BEGIN PRIVATE KEY-----") !== 0) {
      throw new TypeError('"pkcs8" must be PKCS#8 formatted string');
    }
    return fromPKCS8(pkcs8, alg, options);
  });
}
function importJWK(jwk, alg) {
  return __async(this, null, function* () {
    if (!isObject(jwk)) {
      throw new TypeError("JWK must be an object");
    }
    alg || (alg = jwk.alg);
    switch (jwk.kty) {
      case "oct":
        if (typeof jwk.k !== "string" || !jwk.k) {
          throw new TypeError('missing "k" (Key Value) Parameter value');
        }
        return decode(jwk.k);
      case "RSA":
        if (jwk.oth !== void 0) {
          throw new JOSENotSupported('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
        }
      case "EC":
      case "OKP":
        return jwk_to_key_default(__spreadProps(__spreadValues({}, jwk), { alg }));
      default:
        throw new JOSENotSupported('Unsupported "kty" (Key Type) Parameter value');
    }
  });
}

// node_modules/jose/dist/browser/lib/check_key_type.js
var symmetricTypeCheck = (alg, key) => {
  if (key instanceof Uint8Array)
    return;
  if (!is_key_like_default(key)) {
    throw new TypeError(withAlg(alg, key, ...types, "Uint8Array"));
  }
  if (key.type !== "secret") {
    throw new TypeError(`${types.join(" or ")} instances for symmetric algorithms must be of type "secret"`);
  }
};
var asymmetricTypeCheck = (alg, key, usage) => {
  if (!is_key_like_default(key)) {
    throw new TypeError(withAlg(alg, key, ...types));
  }
  if (key.type === "secret") {
    throw new TypeError(`${types.join(" or ")} instances for asymmetric algorithms must not be of type "secret"`);
  }
  if (usage === "sign" && key.type === "public") {
    throw new TypeError(`${types.join(" or ")} instances for asymmetric algorithm signing must be of type "private"`);
  }
  if (usage === "decrypt" && key.type === "public") {
    throw new TypeError(`${types.join(" or ")} instances for asymmetric algorithm decryption must be of type "private"`);
  }
  if (key.algorithm && usage === "verify" && key.type === "private") {
    throw new TypeError(`${types.join(" or ")} instances for asymmetric algorithm verifying must be of type "public"`);
  }
  if (key.algorithm && usage === "encrypt" && key.type === "private") {
    throw new TypeError(`${types.join(" or ")} instances for asymmetric algorithm encryption must be of type "public"`);
  }
};
var checkKeyType = (alg, key, usage) => {
  const symmetric = alg.startsWith("HS") || alg === "dir" || alg.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(alg);
  if (symmetric) {
    symmetricTypeCheck(alg, key);
  } else {
    asymmetricTypeCheck(alg, key, usage);
  }
};
var check_key_type_default = checkKeyType;

// node_modules/jose/dist/browser/runtime/encrypt.js
function cbcEncrypt(enc, plaintext, cek, iv, aad) {
  return __async(this, null, function* () {
    if (!(cek instanceof Uint8Array)) {
      throw new TypeError(invalid_key_input_default(cek, "Uint8Array"));
    }
    const keySize = parseInt(enc.slice(1, 4), 10);
    const encKey = yield webcrypto_default.subtle.importKey("raw", cek.subarray(keySize >> 3), "AES-CBC", false, ["encrypt"]);
    const macKey = yield webcrypto_default.subtle.importKey("raw", cek.subarray(0, keySize >> 3), {
      hash: `SHA-${keySize << 1}`,
      name: "HMAC"
    }, false, ["sign"]);
    const ciphertext = new Uint8Array(yield webcrypto_default.subtle.encrypt({
      iv,
      name: "AES-CBC"
    }, encKey, plaintext));
    const macData = concat(aad, iv, ciphertext, uint64be(aad.length << 3));
    const tag = new Uint8Array((yield webcrypto_default.subtle.sign("HMAC", macKey, macData)).slice(0, keySize >> 3));
    return { ciphertext, tag, iv };
  });
}
function gcmEncrypt(enc, plaintext, cek, iv, aad) {
  return __async(this, null, function* () {
    let encKey;
    if (cek instanceof Uint8Array) {
      encKey = yield webcrypto_default.subtle.importKey("raw", cek, "AES-GCM", false, ["encrypt"]);
    } else {
      checkEncCryptoKey(cek, enc, "encrypt");
      encKey = cek;
    }
    const encrypted = new Uint8Array(yield webcrypto_default.subtle.encrypt({
      additionalData: aad,
      iv,
      name: "AES-GCM",
      tagLength: 128
    }, encKey, plaintext));
    const tag = encrypted.slice(-16);
    const ciphertext = encrypted.slice(0, -16);
    return { ciphertext, tag, iv };
  });
}
var encrypt3 = (enc, plaintext, cek, iv, aad) => __async(void 0, null, function* () {
  if (!isCryptoKey(cek) && !(cek instanceof Uint8Array)) {
    throw new TypeError(invalid_key_input_default(cek, ...types, "Uint8Array"));
  }
  if (iv) {
    check_iv_length_default(enc, iv);
  } else {
    iv = iv_default(enc);
  }
  switch (enc) {
    case "A128CBC-HS256":
    case "A192CBC-HS384":
    case "A256CBC-HS512":
      if (cek instanceof Uint8Array) {
        check_cek_length_default(cek, parseInt(enc.slice(-3), 10));
      }
      return cbcEncrypt(enc, plaintext, cek, iv, aad);
    case "A128GCM":
    case "A192GCM":
    case "A256GCM":
      if (cek instanceof Uint8Array) {
        check_cek_length_default(cek, parseInt(enc.slice(1, 4), 10));
      }
      return gcmEncrypt(enc, plaintext, cek, iv, aad);
    default:
      throw new JOSENotSupported("Unsupported JWE Content Encryption Algorithm");
  }
});
var encrypt_default = encrypt3;

// node_modules/jose/dist/browser/lib/aesgcmkw.js
function wrap2(alg, key, cek, iv) {
  return __async(this, null, function* () {
    const jweAlgorithm = alg.slice(0, 7);
    const wrapped = yield encrypt_default(jweAlgorithm, cek, key, iv, new Uint8Array(0));
    return {
      encryptedKey: wrapped.ciphertext,
      iv: encode(wrapped.iv),
      tag: encode(wrapped.tag)
    };
  });
}
function unwrap2(alg, key, encryptedKey, iv, tag) {
  return __async(this, null, function* () {
    const jweAlgorithm = alg.slice(0, 7);
    return decrypt_default(jweAlgorithm, key, encryptedKey, iv, tag, new Uint8Array(0));
  });
}

// node_modules/jose/dist/browser/lib/decrypt_key_management.js
function decryptKeyManagement(alg, key, encryptedKey, joseHeader, options) {
  return __async(this, null, function* () {
    check_key_type_default(alg, key, "decrypt");
    switch (alg) {
      case "dir": {
        if (encryptedKey !== void 0)
          throw new JWEInvalid("Encountered unexpected JWE Encrypted Key");
        return key;
      }
      case "ECDH-ES":
        if (encryptedKey !== void 0)
          throw new JWEInvalid("Encountered unexpected JWE Encrypted Key");
      case "ECDH-ES+A128KW":
      case "ECDH-ES+A192KW":
      case "ECDH-ES+A256KW": {
        if (!isObject(joseHeader.epk))
          throw new JWEInvalid(`JOSE Header "epk" (Ephemeral Public Key) missing or invalid`);
        if (!ecdhAllowed(key))
          throw new JOSENotSupported("ECDH with the provided key is not allowed or not supported by your javascript runtime");
        const epk = yield importJWK(joseHeader.epk, alg);
        let partyUInfo;
        let partyVInfo;
        if (joseHeader.apu !== void 0) {
          if (typeof joseHeader.apu !== "string")
            throw new JWEInvalid(`JOSE Header "apu" (Agreement PartyUInfo) invalid`);
          try {
            partyUInfo = decode(joseHeader.apu);
          } catch {
            throw new JWEInvalid("Failed to base64url decode the apu");
          }
        }
        if (joseHeader.apv !== void 0) {
          if (typeof joseHeader.apv !== "string")
            throw new JWEInvalid(`JOSE Header "apv" (Agreement PartyVInfo) invalid`);
          try {
            partyVInfo = decode(joseHeader.apv);
          } catch {
            throw new JWEInvalid("Failed to base64url decode the apv");
          }
        }
        const sharedSecret = yield deriveKey(epk, key, alg === "ECDH-ES" ? joseHeader.enc : alg, alg === "ECDH-ES" ? bitLength2(joseHeader.enc) : parseInt(alg.slice(-5, -2), 10), partyUInfo, partyVInfo);
        if (alg === "ECDH-ES")
          return sharedSecret;
        if (encryptedKey === void 0)
          throw new JWEInvalid("JWE Encrypted Key missing");
        return unwrap(alg.slice(-6), sharedSecret, encryptedKey);
      }
      case "RSA1_5":
      case "RSA-OAEP":
      case "RSA-OAEP-256":
      case "RSA-OAEP-384":
      case "RSA-OAEP-512": {
        if (encryptedKey === void 0)
          throw new JWEInvalid("JWE Encrypted Key missing");
        return decrypt3(alg, key, encryptedKey);
      }
      case "PBES2-HS256+A128KW":
      case "PBES2-HS384+A192KW":
      case "PBES2-HS512+A256KW": {
        if (encryptedKey === void 0)
          throw new JWEInvalid("JWE Encrypted Key missing");
        if (typeof joseHeader.p2c !== "number")
          throw new JWEInvalid(`JOSE Header "p2c" (PBES2 Count) missing or invalid`);
        const p2cLimit = options?.maxPBES2Count || 1e4;
        if (joseHeader.p2c > p2cLimit)
          throw new JWEInvalid(`JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds`);
        if (typeof joseHeader.p2s !== "string")
          throw new JWEInvalid(`JOSE Header "p2s" (PBES2 Salt) missing or invalid`);
        let p2s2;
        try {
          p2s2 = decode(joseHeader.p2s);
        } catch {
          throw new JWEInvalid("Failed to base64url decode the p2s");
        }
        return decrypt2(alg, key, encryptedKey, joseHeader.p2c, p2s2);
      }
      case "A128KW":
      case "A192KW":
      case "A256KW": {
        if (encryptedKey === void 0)
          throw new JWEInvalid("JWE Encrypted Key missing");
        return unwrap(alg, key, encryptedKey);
      }
      case "A128GCMKW":
      case "A192GCMKW":
      case "A256GCMKW": {
        if (encryptedKey === void 0)
          throw new JWEInvalid("JWE Encrypted Key missing");
        if (typeof joseHeader.iv !== "string")
          throw new JWEInvalid(`JOSE Header "iv" (Initialization Vector) missing or invalid`);
        if (typeof joseHeader.tag !== "string")
          throw new JWEInvalid(`JOSE Header "tag" (Authentication Tag) missing or invalid`);
        let iv;
        try {
          iv = decode(joseHeader.iv);
        } catch {
          throw new JWEInvalid("Failed to base64url decode the iv");
        }
        let tag;
        try {
          tag = decode(joseHeader.tag);
        } catch {
          throw new JWEInvalid("Failed to base64url decode the tag");
        }
        return unwrap2(alg, key, encryptedKey, iv, tag);
      }
      default: {
        throw new JOSENotSupported('Invalid or unsupported "alg" (JWE Algorithm) header value');
      }
    }
  });
}
var decrypt_key_management_default = decryptKeyManagement;

// node_modules/jose/dist/browser/lib/validate_crit.js
function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
  if (joseHeader.crit !== void 0 && protectedHeader?.crit === void 0) {
    throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
  }
  if (!protectedHeader || protectedHeader.crit === void 0) {
    return /* @__PURE__ */ new Set();
  }
  if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input) => typeof input !== "string" || input.length === 0)) {
    throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
  }
  let recognized;
  if (recognizedOption !== void 0) {
    recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
  } else {
    recognized = recognizedDefault;
  }
  for (const parameter of protectedHeader.crit) {
    if (!recognized.has(parameter)) {
      throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
    }
    if (joseHeader[parameter] === void 0) {
      throw new Err(`Extension Header Parameter "${parameter}" is missing`);
    }
    if (recognized.get(parameter) && protectedHeader[parameter] === void 0) {
      throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
    }
  }
  return new Set(protectedHeader.crit);
}
var validate_crit_default = validateCrit;

// node_modules/jose/dist/browser/lib/validate_algorithms.js
var validateAlgorithms = (option, algorithms) => {
  if (algorithms !== void 0 && (!Array.isArray(algorithms) || algorithms.some((s) => typeof s !== "string"))) {
    throw new TypeError(`"${option}" option must be an array of strings`);
  }
  if (!algorithms) {
    return void 0;
  }
  return new Set(algorithms);
};
var validate_algorithms_default = validateAlgorithms;

// node_modules/jose/dist/browser/jwe/flattened/decrypt.js
function flattenedDecrypt(jwe, key, options) {
  return __async(this, null, function* () {
    if (!isObject(jwe)) {
      throw new JWEInvalid("Flattened JWE must be an object");
    }
    if (jwe.protected === void 0 && jwe.header === void 0 && jwe.unprotected === void 0) {
      throw new JWEInvalid("JOSE Header missing");
    }
    if (jwe.iv !== void 0 && typeof jwe.iv !== "string") {
      throw new JWEInvalid("JWE Initialization Vector incorrect type");
    }
    if (typeof jwe.ciphertext !== "string") {
      throw new JWEInvalid("JWE Ciphertext missing or incorrect type");
    }
    if (jwe.tag !== void 0 && typeof jwe.tag !== "string") {
      throw new JWEInvalid("JWE Authentication Tag incorrect type");
    }
    if (jwe.protected !== void 0 && typeof jwe.protected !== "string") {
      throw new JWEInvalid("JWE Protected Header incorrect type");
    }
    if (jwe.encrypted_key !== void 0 && typeof jwe.encrypted_key !== "string") {
      throw new JWEInvalid("JWE Encrypted Key incorrect type");
    }
    if (jwe.aad !== void 0 && typeof jwe.aad !== "string") {
      throw new JWEInvalid("JWE AAD incorrect type");
    }
    if (jwe.header !== void 0 && !isObject(jwe.header)) {
      throw new JWEInvalid("JWE Shared Unprotected Header incorrect type");
    }
    if (jwe.unprotected !== void 0 && !isObject(jwe.unprotected)) {
      throw new JWEInvalid("JWE Per-Recipient Unprotected Header incorrect type");
    }
    let parsedProt;
    if (jwe.protected) {
      try {
        const protectedHeader2 = decode(jwe.protected);
        parsedProt = JSON.parse(decoder.decode(protectedHeader2));
      } catch {
        throw new JWEInvalid("JWE Protected Header is invalid");
      }
    }
    if (!is_disjoint_default(parsedProt, jwe.header, jwe.unprotected)) {
      throw new JWEInvalid("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
    }
    const joseHeader = __spreadValues(__spreadValues(__spreadValues({}, parsedProt), jwe.header), jwe.unprotected);
    validate_crit_default(JWEInvalid, /* @__PURE__ */ new Map(), options?.crit, parsedProt, joseHeader);
    if (joseHeader.zip !== void 0) {
      throw new JOSENotSupported('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
    }
    const { alg, enc } = joseHeader;
    if (typeof alg !== "string" || !alg) {
      throw new JWEInvalid("missing JWE Algorithm (alg) in JWE Header");
    }
    if (typeof enc !== "string" || !enc) {
      throw new JWEInvalid("missing JWE Encryption Algorithm (enc) in JWE Header");
    }
    const keyManagementAlgorithms = options && validate_algorithms_default("keyManagementAlgorithms", options.keyManagementAlgorithms);
    const contentEncryptionAlgorithms = options && validate_algorithms_default("contentEncryptionAlgorithms", options.contentEncryptionAlgorithms);
    if (keyManagementAlgorithms && !keyManagementAlgorithms.has(alg) || !keyManagementAlgorithms && alg.startsWith("PBES2")) {
      throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter value not allowed');
    }
    if (contentEncryptionAlgorithms && !contentEncryptionAlgorithms.has(enc)) {
      throw new JOSEAlgNotAllowed('"enc" (Encryption Algorithm) Header Parameter value not allowed');
    }
    let encryptedKey;
    if (jwe.encrypted_key !== void 0) {
      try {
        encryptedKey = decode(jwe.encrypted_key);
      } catch {
        throw new JWEInvalid("Failed to base64url decode the encrypted_key");
      }
    }
    let resolvedKey = false;
    if (typeof key === "function") {
      key = yield key(parsedProt, jwe);
      resolvedKey = true;
    }
    let cek;
    try {
      cek = yield decrypt_key_management_default(alg, key, encryptedKey, joseHeader, options);
    } catch (err) {
      if (err instanceof TypeError || err instanceof JWEInvalid || err instanceof JOSENotSupported) {
        throw err;
      }
      cek = cek_default(enc);
    }
    let iv;
    let tag;
    if (jwe.iv !== void 0) {
      try {
        iv = decode(jwe.iv);
      } catch {
        throw new JWEInvalid("Failed to base64url decode the iv");
      }
    }
    if (jwe.tag !== void 0) {
      try {
        tag = decode(jwe.tag);
      } catch {
        throw new JWEInvalid("Failed to base64url decode the tag");
      }
    }
    const protectedHeader = encoder.encode(jwe.protected ?? "");
    let additionalData;
    if (jwe.aad !== void 0) {
      additionalData = concat(protectedHeader, encoder.encode("."), encoder.encode(jwe.aad));
    } else {
      additionalData = protectedHeader;
    }
    let ciphertext;
    try {
      ciphertext = decode(jwe.ciphertext);
    } catch {
      throw new JWEInvalid("Failed to base64url decode the ciphertext");
    }
    const plaintext = yield decrypt_default(enc, cek, ciphertext, iv, tag, additionalData);
    const result = { plaintext };
    if (jwe.protected !== void 0) {
      result.protectedHeader = parsedProt;
    }
    if (jwe.aad !== void 0) {
      try {
        result.additionalAuthenticatedData = decode(jwe.aad);
      } catch {
        throw new JWEInvalid("Failed to base64url decode the aad");
      }
    }
    if (jwe.unprotected !== void 0) {
      result.sharedUnprotectedHeader = jwe.unprotected;
    }
    if (jwe.header !== void 0) {
      result.unprotectedHeader = jwe.header;
    }
    if (resolvedKey) {
      return __spreadProps(__spreadValues({}, result), { key });
    }
    return result;
  });
}

// node_modules/jose/dist/browser/jwe/compact/decrypt.js
function compactDecrypt(jwe, key, options) {
  return __async(this, null, function* () {
    if (jwe instanceof Uint8Array) {
      jwe = decoder.decode(jwe);
    }
    if (typeof jwe !== "string") {
      throw new JWEInvalid("Compact JWE must be a string or Uint8Array");
    }
    const { 0: protectedHeader, 1: encryptedKey, 2: iv, 3: ciphertext, 4: tag, length } = jwe.split(".");
    if (length !== 5) {
      throw new JWEInvalid("Invalid Compact JWE");
    }
    const decrypted = yield flattenedDecrypt({
      ciphertext,
      iv: iv || void 0,
      protected: protectedHeader,
      tag: tag || void 0,
      encrypted_key: encryptedKey || void 0
    }, key, options);
    const result = { plaintext: decrypted.plaintext, protectedHeader: decrypted.protectedHeader };
    if (typeof key === "function") {
      return __spreadProps(__spreadValues({}, result), { key: decrypted.key });
    }
    return result;
  });
}

// node_modules/jose/dist/browser/jwe/general/decrypt.js
function generalDecrypt(jwe, key, options) {
  return __async(this, null, function* () {
    if (!isObject(jwe)) {
      throw new JWEInvalid("General JWE must be an object");
    }
    if (!Array.isArray(jwe.recipients) || !jwe.recipients.every(isObject)) {
      throw new JWEInvalid("JWE Recipients missing or incorrect type");
    }
    if (!jwe.recipients.length) {
      throw new JWEInvalid("JWE Recipients has no members");
    }
    for (const recipient of jwe.recipients) {
      try {
        return yield flattenedDecrypt({
          aad: jwe.aad,
          ciphertext: jwe.ciphertext,
          encrypted_key: recipient.encrypted_key,
          header: recipient.header,
          iv: jwe.iv,
          protected: jwe.protected,
          tag: jwe.tag,
          unprotected: jwe.unprotected
        }, key, options);
      } catch {
      }
    }
    throw new JWEDecryptionFailed();
  });
}

// node_modules/jose/dist/browser/runtime/key_to_jwk.js
var keyToJWK = (key) => __async(void 0, null, function* () {
  if (key instanceof Uint8Array) {
    return {
      kty: "oct",
      k: encode(key)
    };
  }
  if (!isCryptoKey(key)) {
    throw new TypeError(invalid_key_input_default(key, ...types, "Uint8Array"));
  }
  if (!key.extractable) {
    throw new TypeError("non-extractable CryptoKey cannot be exported as a JWK");
  }
  const _a = yield webcrypto_default.subtle.exportKey("jwk", key), { ext, key_ops, alg, use } = _a, jwk = __objRest(_a, ["ext", "key_ops", "alg", "use"]);
  return jwk;
});
var key_to_jwk_default = keyToJWK;

// node_modules/jose/dist/browser/key/export.js
function exportSPKI(key) {
  return __async(this, null, function* () {
    return toSPKI(key);
  });
}
function exportPKCS8(key) {
  return __async(this, null, function* () {
    return toPKCS8(key);
  });
}
function exportJWK(key) {
  return __async(this, null, function* () {
    return key_to_jwk_default(key);
  });
}

// node_modules/jose/dist/browser/lib/encrypt_key_management.js
function encryptKeyManagement(_0, _1, _2, _3) {
  return __async(this, arguments, function* (alg, enc, key, providedCek, providedParameters = {}) {
    var _a, _b;
    let encryptedKey;
    let parameters;
    let cek;
    check_key_type_default(alg, key, "encrypt");
    switch (alg) {
      case "dir": {
        cek = key;
        break;
      }
      case "ECDH-ES":
      case "ECDH-ES+A128KW":
      case "ECDH-ES+A192KW":
      case "ECDH-ES+A256KW": {
        if (!ecdhAllowed(key)) {
          throw new JOSENotSupported("ECDH with the provided key is not allowed or not supported by your javascript runtime");
        }
        const { apu, apv } = providedParameters;
        let { epk: ephemeralKey } = providedParameters;
        ephemeralKey || (ephemeralKey = (yield generateEpk(key)).privateKey);
        const { x, y, crv, kty } = yield exportJWK(ephemeralKey);
        const sharedSecret = yield deriveKey(key, ephemeralKey, alg === "ECDH-ES" ? enc : alg, alg === "ECDH-ES" ? bitLength2(enc) : parseInt(alg.slice(-5, -2), 10), apu, apv);
        parameters = { epk: { x, crv, kty } };
        if (kty === "EC")
          parameters.epk.y = y;
        if (apu)
          parameters.apu = encode(apu);
        if (apv)
          parameters.apv = encode(apv);
        if (alg === "ECDH-ES") {
          cek = sharedSecret;
          break;
        }
        cek = providedCek || cek_default(enc);
        const kwAlg = alg.slice(-6);
        encryptedKey = yield wrap(kwAlg, sharedSecret, cek);
        break;
      }
      case "RSA1_5":
      case "RSA-OAEP":
      case "RSA-OAEP-256":
      case "RSA-OAEP-384":
      case "RSA-OAEP-512": {
        cek = providedCek || cek_default(enc);
        encryptedKey = yield encrypt2(alg, key, cek);
        break;
      }
      case "PBES2-HS256+A128KW":
      case "PBES2-HS384+A192KW":
      case "PBES2-HS512+A256KW": {
        cek = providedCek || cek_default(enc);
        const { p2c, p2s: p2s2 } = providedParameters;
        _a = yield encrypt(alg, key, cek, p2c, p2s2), { encryptedKey } = _a, parameters = __objRest(_a, ["encryptedKey"]);
        break;
      }
      case "A128KW":
      case "A192KW":
      case "A256KW": {
        cek = providedCek || cek_default(enc);
        encryptedKey = yield wrap(alg, key, cek);
        break;
      }
      case "A128GCMKW":
      case "A192GCMKW":
      case "A256GCMKW": {
        cek = providedCek || cek_default(enc);
        const { iv } = providedParameters;
        _b = yield wrap2(alg, key, cek, iv), { encryptedKey } = _b, parameters = __objRest(_b, ["encryptedKey"]);
        break;
      }
      default: {
        throw new JOSENotSupported('Invalid or unsupported "alg" (JWE Algorithm) header value');
      }
    }
    return { cek, encryptedKey, parameters };
  });
}
var encrypt_key_management_default = encryptKeyManagement;

// node_modules/jose/dist/browser/jwe/flattened/encrypt.js
var unprotected = Symbol();
var FlattenedEncrypt = class {
  constructor(plaintext) {
    if (!(plaintext instanceof Uint8Array)) {
      throw new TypeError("plaintext must be an instance of Uint8Array");
    }
    this._plaintext = plaintext;
  }
  setKeyManagementParameters(parameters) {
    if (this._keyManagementParameters) {
      throw new TypeError("setKeyManagementParameters can only be called once");
    }
    this._keyManagementParameters = parameters;
    return this;
  }
  setProtectedHeader(protectedHeader) {
    if (this._protectedHeader) {
      throw new TypeError("setProtectedHeader can only be called once");
    }
    this._protectedHeader = protectedHeader;
    return this;
  }
  setSharedUnprotectedHeader(sharedUnprotectedHeader) {
    if (this._sharedUnprotectedHeader) {
      throw new TypeError("setSharedUnprotectedHeader can only be called once");
    }
    this._sharedUnprotectedHeader = sharedUnprotectedHeader;
    return this;
  }
  setUnprotectedHeader(unprotectedHeader) {
    if (this._unprotectedHeader) {
      throw new TypeError("setUnprotectedHeader can only be called once");
    }
    this._unprotectedHeader = unprotectedHeader;
    return this;
  }
  setAdditionalAuthenticatedData(aad) {
    this._aad = aad;
    return this;
  }
  setContentEncryptionKey(cek) {
    if (this._cek) {
      throw new TypeError("setContentEncryptionKey can only be called once");
    }
    this._cek = cek;
    return this;
  }
  setInitializationVector(iv) {
    if (this._iv) {
      throw new TypeError("setInitializationVector can only be called once");
    }
    this._iv = iv;
    return this;
  }
  encrypt(key, options) {
    return __async(this, null, function* () {
      if (!this._protectedHeader && !this._unprotectedHeader && !this._sharedUnprotectedHeader) {
        throw new JWEInvalid("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
      }
      if (!is_disjoint_default(this._protectedHeader, this._unprotectedHeader, this._sharedUnprotectedHeader)) {
        throw new JWEInvalid("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
      }
      const joseHeader = __spreadValues(__spreadValues(__spreadValues({}, this._protectedHeader), this._unprotectedHeader), this._sharedUnprotectedHeader);
      validate_crit_default(JWEInvalid, /* @__PURE__ */ new Map(), options?.crit, this._protectedHeader, joseHeader);
      if (joseHeader.zip !== void 0) {
        throw new JOSENotSupported('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
      }
      const { alg, enc } = joseHeader;
      if (typeof alg !== "string" || !alg) {
        throw new JWEInvalid('JWE "alg" (Algorithm) Header Parameter missing or invalid');
      }
      if (typeof enc !== "string" || !enc) {
        throw new JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
      }
      let encryptedKey;
      if (this._cek && (alg === "dir" || alg === "ECDH-ES")) {
        throw new TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${alg}`);
      }
      let cek;
      {
        let parameters;
        ({ cek, encryptedKey, parameters } = yield encrypt_key_management_default(alg, enc, key, this._cek, this._keyManagementParameters));
        if (parameters) {
          if (options && unprotected in options) {
            if (!this._unprotectedHeader) {
              this.setUnprotectedHeader(parameters);
            } else {
              this._unprotectedHeader = __spreadValues(__spreadValues({}, this._unprotectedHeader), parameters);
            }
          } else {
            if (!this._protectedHeader) {
              this.setProtectedHeader(parameters);
            } else {
              this._protectedHeader = __spreadValues(__spreadValues({}, this._protectedHeader), parameters);
            }
          }
        }
      }
      let additionalData;
      let protectedHeader;
      let aadMember;
      if (this._protectedHeader) {
        protectedHeader = encoder.encode(encode(JSON.stringify(this._protectedHeader)));
      } else {
        protectedHeader = encoder.encode("");
      }
      if (this._aad) {
        aadMember = encode(this._aad);
        additionalData = concat(protectedHeader, encoder.encode("."), encoder.encode(aadMember));
      } else {
        additionalData = protectedHeader;
      }
      const { ciphertext, tag, iv } = yield encrypt_default(enc, this._plaintext, cek, this._iv, additionalData);
      const jwe = {
        ciphertext: encode(ciphertext)
      };
      if (iv) {
        jwe.iv = encode(iv);
      }
      if (tag) {
        jwe.tag = encode(tag);
      }
      if (encryptedKey) {
        jwe.encrypted_key = encode(encryptedKey);
      }
      if (aadMember) {
        jwe.aad = aadMember;
      }
      if (this._protectedHeader) {
        jwe.protected = decoder.decode(protectedHeader);
      }
      if (this._sharedUnprotectedHeader) {
        jwe.unprotected = this._sharedUnprotectedHeader;
      }
      if (this._unprotectedHeader) {
        jwe.header = this._unprotectedHeader;
      }
      return jwe;
    });
  }
};

// node_modules/jose/dist/browser/jwe/general/encrypt.js
var IndividualRecipient = class {
  constructor(enc, key, options) {
    this.parent = enc;
    this.key = key;
    this.options = options;
  }
  setUnprotectedHeader(unprotectedHeader) {
    if (this.unprotectedHeader) {
      throw new TypeError("setUnprotectedHeader can only be called once");
    }
    this.unprotectedHeader = unprotectedHeader;
    return this;
  }
  addRecipient(...args) {
    return this.parent.addRecipient(...args);
  }
  encrypt(...args) {
    return this.parent.encrypt(...args);
  }
  done() {
    return this.parent;
  }
};
var GeneralEncrypt = class {
  constructor(plaintext) {
    this._recipients = [];
    this._plaintext = plaintext;
  }
  addRecipient(key, options) {
    const recipient = new IndividualRecipient(this, key, { crit: options?.crit });
    this._recipients.push(recipient);
    return recipient;
  }
  setProtectedHeader(protectedHeader) {
    if (this._protectedHeader) {
      throw new TypeError("setProtectedHeader can only be called once");
    }
    this._protectedHeader = protectedHeader;
    return this;
  }
  setSharedUnprotectedHeader(sharedUnprotectedHeader) {
    if (this._unprotectedHeader) {
      throw new TypeError("setSharedUnprotectedHeader can only be called once");
    }
    this._unprotectedHeader = sharedUnprotectedHeader;
    return this;
  }
  setAdditionalAuthenticatedData(aad) {
    this._aad = aad;
    return this;
  }
  encrypt() {
    return __async(this, null, function* () {
      if (!this._recipients.length) {
        throw new JWEInvalid("at least one recipient must be added");
      }
      if (this._recipients.length === 1) {
        const [recipient] = this._recipients;
        const flattened = yield new FlattenedEncrypt(this._plaintext).setAdditionalAuthenticatedData(this._aad).setProtectedHeader(this._protectedHeader).setSharedUnprotectedHeader(this._unprotectedHeader).setUnprotectedHeader(recipient.unprotectedHeader).encrypt(recipient.key, __spreadValues({}, recipient.options));
        const jwe2 = {
          ciphertext: flattened.ciphertext,
          iv: flattened.iv,
          recipients: [{}],
          tag: flattened.tag
        };
        if (flattened.aad)
          jwe2.aad = flattened.aad;
        if (flattened.protected)
          jwe2.protected = flattened.protected;
        if (flattened.unprotected)
          jwe2.unprotected = flattened.unprotected;
        if (flattened.encrypted_key)
          jwe2.recipients[0].encrypted_key = flattened.encrypted_key;
        if (flattened.header)
          jwe2.recipients[0].header = flattened.header;
        return jwe2;
      }
      let enc;
      for (let i = 0; i < this._recipients.length; i++) {
        const recipient = this._recipients[i];
        if (!is_disjoint_default(this._protectedHeader, this._unprotectedHeader, recipient.unprotectedHeader)) {
          throw new JWEInvalid("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
        }
        const joseHeader = __spreadValues(__spreadValues(__spreadValues({}, this._protectedHeader), this._unprotectedHeader), recipient.unprotectedHeader);
        const { alg } = joseHeader;
        if (typeof alg !== "string" || !alg) {
          throw new JWEInvalid('JWE "alg" (Algorithm) Header Parameter missing or invalid');
        }
        if (alg === "dir" || alg === "ECDH-ES") {
          throw new JWEInvalid('"dir" and "ECDH-ES" alg may only be used with a single recipient');
        }
        if (typeof joseHeader.enc !== "string" || !joseHeader.enc) {
          throw new JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
        }
        if (!enc) {
          enc = joseHeader.enc;
        } else if (enc !== joseHeader.enc) {
          throw new JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter must be the same for all recipients');
        }
        validate_crit_default(JWEInvalid, /* @__PURE__ */ new Map(), recipient.options.crit, this._protectedHeader, joseHeader);
        if (joseHeader.zip !== void 0) {
          throw new JOSENotSupported('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
        }
      }
      const cek = cek_default(enc);
      const jwe = {
        ciphertext: "",
        iv: "",
        recipients: [],
        tag: ""
      };
      for (let i = 0; i < this._recipients.length; i++) {
        const recipient = this._recipients[i];
        const target = {};
        jwe.recipients.push(target);
        const joseHeader = __spreadValues(__spreadValues(__spreadValues({}, this._protectedHeader), this._unprotectedHeader), recipient.unprotectedHeader);
        const p2c = joseHeader.alg.startsWith("PBES2") ? 2048 + i : void 0;
        if (i === 0) {
          const flattened = yield new FlattenedEncrypt(this._plaintext).setAdditionalAuthenticatedData(this._aad).setContentEncryptionKey(cek).setProtectedHeader(this._protectedHeader).setSharedUnprotectedHeader(this._unprotectedHeader).setUnprotectedHeader(recipient.unprotectedHeader).setKeyManagementParameters({ p2c }).encrypt(recipient.key, __spreadProps(__spreadValues({}, recipient.options), {
            [unprotected]: true
          }));
          jwe.ciphertext = flattened.ciphertext;
          jwe.iv = flattened.iv;
          jwe.tag = flattened.tag;
          if (flattened.aad)
            jwe.aad = flattened.aad;
          if (flattened.protected)
            jwe.protected = flattened.protected;
          if (flattened.unprotected)
            jwe.unprotected = flattened.unprotected;
          target.encrypted_key = flattened.encrypted_key;
          if (flattened.header)
            target.header = flattened.header;
          continue;
        }
        const { encryptedKey, parameters } = yield encrypt_key_management_default(recipient.unprotectedHeader?.alg || this._protectedHeader?.alg || this._unprotectedHeader?.alg, enc, recipient.key, cek, { p2c });
        target.encrypted_key = encode(encryptedKey);
        if (recipient.unprotectedHeader || parameters)
          target.header = __spreadValues(__spreadValues({}, recipient.unprotectedHeader), parameters);
      }
      return jwe;
    });
  }
};

// node_modules/jose/dist/browser/runtime/subtle_dsa.js
function subtleDsa(alg, algorithm) {
  const hash = `SHA-${alg.slice(-3)}`;
  switch (alg) {
    case "HS256":
    case "HS384":
    case "HS512":
      return { hash, name: "HMAC" };
    case "PS256":
    case "PS384":
    case "PS512":
      return { hash, name: "RSA-PSS", saltLength: alg.slice(-3) >> 3 };
    case "RS256":
    case "RS384":
    case "RS512":
      return { hash, name: "RSASSA-PKCS1-v1_5" };
    case "ES256":
    case "ES384":
    case "ES512":
      return { hash, name: "ECDSA", namedCurve: algorithm.namedCurve };
    case "EdDSA":
      return { name: algorithm.name };
    default:
      throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
  }
}

// node_modules/jose/dist/browser/runtime/get_sign_verify_key.js
function getCryptoKey3(alg, key, usage) {
  if (isCryptoKey(key)) {
    checkSigCryptoKey(key, alg, usage);
    return key;
  }
  if (key instanceof Uint8Array) {
    if (!alg.startsWith("HS")) {
      throw new TypeError(invalid_key_input_default(key, ...types));
    }
    return webcrypto_default.subtle.importKey("raw", key, { hash: `SHA-${alg.slice(-3)}`, name: "HMAC" }, false, [usage]);
  }
  throw new TypeError(invalid_key_input_default(key, ...types, "Uint8Array"));
}

// node_modules/jose/dist/browser/runtime/verify.js
var verify = (alg, key, signature, data) => __async(void 0, null, function* () {
  const cryptoKey = yield getCryptoKey3(alg, key, "verify");
  check_key_length_default(alg, cryptoKey);
  const algorithm = subtleDsa(alg, cryptoKey.algorithm);
  try {
    return yield webcrypto_default.subtle.verify(algorithm, cryptoKey, signature, data);
  } catch {
    return false;
  }
});
var verify_default = verify;

// node_modules/jose/dist/browser/jws/flattened/verify.js
function flattenedVerify(jws, key, options) {
  return __async(this, null, function* () {
    if (!isObject(jws)) {
      throw new JWSInvalid("Flattened JWS must be an object");
    }
    if (jws.protected === void 0 && jws.header === void 0) {
      throw new JWSInvalid('Flattened JWS must have either of the "protected" or "header" members');
    }
    if (jws.protected !== void 0 && typeof jws.protected !== "string") {
      throw new JWSInvalid("JWS Protected Header incorrect type");
    }
    if (jws.payload === void 0) {
      throw new JWSInvalid("JWS Payload missing");
    }
    if (typeof jws.signature !== "string") {
      throw new JWSInvalid("JWS Signature missing or incorrect type");
    }
    if (jws.header !== void 0 && !isObject(jws.header)) {
      throw new JWSInvalid("JWS Unprotected Header incorrect type");
    }
    let parsedProt = {};
    if (jws.protected) {
      try {
        const protectedHeader = decode(jws.protected);
        parsedProt = JSON.parse(decoder.decode(protectedHeader));
      } catch {
        throw new JWSInvalid("JWS Protected Header is invalid");
      }
    }
    if (!is_disjoint_default(parsedProt, jws.header)) {
      throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
    }
    const joseHeader = __spreadValues(__spreadValues({}, parsedProt), jws.header);
    const extensions = validate_crit_default(JWSInvalid, /* @__PURE__ */ new Map([["b64", true]]), options?.crit, parsedProt, joseHeader);
    let b64 = true;
    if (extensions.has("b64")) {
      b64 = parsedProt.b64;
      if (typeof b64 !== "boolean") {
        throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
      }
    }
    const { alg } = joseHeader;
    if (typeof alg !== "string" || !alg) {
      throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
    }
    const algorithms = options && validate_algorithms_default("algorithms", options.algorithms);
    if (algorithms && !algorithms.has(alg)) {
      throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter value not allowed');
    }
    if (b64) {
      if (typeof jws.payload !== "string") {
        throw new JWSInvalid("JWS Payload must be a string");
      }
    } else if (typeof jws.payload !== "string" && !(jws.payload instanceof Uint8Array)) {
      throw new JWSInvalid("JWS Payload must be a string or an Uint8Array instance");
    }
    let resolvedKey = false;
    if (typeof key === "function") {
      key = yield key(parsedProt, jws);
      resolvedKey = true;
    }
    check_key_type_default(alg, key, "verify");
    const data = concat(encoder.encode(jws.protected ?? ""), encoder.encode("."), typeof jws.payload === "string" ? encoder.encode(jws.payload) : jws.payload);
    let signature;
    try {
      signature = decode(jws.signature);
    } catch {
      throw new JWSInvalid("Failed to base64url decode the signature");
    }
    const verified = yield verify_default(alg, key, signature, data);
    if (!verified) {
      throw new JWSSignatureVerificationFailed();
    }
    let payload;
    if (b64) {
      try {
        payload = decode(jws.payload);
      } catch {
        throw new JWSInvalid("Failed to base64url decode the payload");
      }
    } else if (typeof jws.payload === "string") {
      payload = encoder.encode(jws.payload);
    } else {
      payload = jws.payload;
    }
    const result = { payload };
    if (jws.protected !== void 0) {
      result.protectedHeader = parsedProt;
    }
    if (jws.header !== void 0) {
      result.unprotectedHeader = jws.header;
    }
    if (resolvedKey) {
      return __spreadProps(__spreadValues({}, result), { key });
    }
    return result;
  });
}

// node_modules/jose/dist/browser/jws/compact/verify.js
function compactVerify(jws, key, options) {
  return __async(this, null, function* () {
    if (jws instanceof Uint8Array) {
      jws = decoder.decode(jws);
    }
    if (typeof jws !== "string") {
      throw new JWSInvalid("Compact JWS must be a string or Uint8Array");
    }
    const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split(".");
    if (length !== 3) {
      throw new JWSInvalid("Invalid Compact JWS");
    }
    const verified = yield flattenedVerify({ payload, protected: protectedHeader, signature }, key, options);
    const result = { payload: verified.payload, protectedHeader: verified.protectedHeader };
    if (typeof key === "function") {
      return __spreadProps(__spreadValues({}, result), { key: verified.key });
    }
    return result;
  });
}

// node_modules/jose/dist/browser/jws/general/verify.js
function generalVerify(jws, key, options) {
  return __async(this, null, function* () {
    if (!isObject(jws)) {
      throw new JWSInvalid("General JWS must be an object");
    }
    if (!Array.isArray(jws.signatures) || !jws.signatures.every(isObject)) {
      throw new JWSInvalid("JWS Signatures missing or incorrect type");
    }
    for (const signature of jws.signatures) {
      try {
        return yield flattenedVerify({
          header: signature.header,
          payload: jws.payload,
          protected: signature.protected,
          signature: signature.signature
        }, key, options);
      } catch {
      }
    }
    throw new JWSSignatureVerificationFailed();
  });
}

// node_modules/jose/dist/browser/lib/epoch.js
var epoch_default = (date) => Math.floor(date.getTime() / 1e3);

// node_modules/jose/dist/browser/lib/secs.js
var minute = 60;
var hour = minute * 60;
var day = hour * 24;
var week = day * 7;
var year = day * 365.25;
var REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
var secs_default = (str) => {
  const matched = REGEX.exec(str);
  if (!matched || matched[4] && matched[1]) {
    throw new TypeError("Invalid time period format");
  }
  const value = parseFloat(matched[2]);
  const unit = matched[3].toLowerCase();
  let numericDate;
  switch (unit) {
    case "sec":
    case "secs":
    case "second":
    case "seconds":
    case "s":
      numericDate = Math.round(value);
      break;
    case "minute":
    case "minutes":
    case "min":
    case "mins":
    case "m":
      numericDate = Math.round(value * minute);
      break;
    case "hour":
    case "hours":
    case "hr":
    case "hrs":
    case "h":
      numericDate = Math.round(value * hour);
      break;
    case "day":
    case "days":
    case "d":
      numericDate = Math.round(value * day);
      break;
    case "week":
    case "weeks":
    case "w":
      numericDate = Math.round(value * week);
      break;
    default:
      numericDate = Math.round(value * year);
      break;
  }
  if (matched[1] === "-" || matched[4] === "ago") {
    return -numericDate;
  }
  return numericDate;
};

// node_modules/jose/dist/browser/lib/jwt_claims_set.js
var normalizeTyp = (value) => value.toLowerCase().replace(/^application\//, "");
var checkAudiencePresence = (audPayload, audOption) => {
  if (typeof audPayload === "string") {
    return audOption.includes(audPayload);
  }
  if (Array.isArray(audPayload)) {
    return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
  }
  return false;
};
var jwt_claims_set_default = (protectedHeader, encodedPayload, options = {}) => {
  const { typ } = options;
  if (typ && (typeof protectedHeader.typ !== "string" || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) {
    throw new JWTClaimValidationFailed('unexpected "typ" JWT header value', "typ", "check_failed");
  }
  let payload;
  try {
    payload = JSON.parse(decoder.decode(encodedPayload));
  } catch {
  }
  if (!isObject(payload)) {
    throw new JWTInvalid("JWT Claims Set must be a top-level JSON object");
  }
  const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options;
  const presenceCheck = [...requiredClaims];
  if (maxTokenAge !== void 0)
    presenceCheck.push("iat");
  if (audience !== void 0)
    presenceCheck.push("aud");
  if (subject !== void 0)
    presenceCheck.push("sub");
  if (issuer !== void 0)
    presenceCheck.push("iss");
  for (const claim of new Set(presenceCheck.reverse())) {
    if (!(claim in payload)) {
      throw new JWTClaimValidationFailed(`missing required "${claim}" claim`, claim, "missing");
    }
  }
  if (issuer && !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) {
    throw new JWTClaimValidationFailed('unexpected "iss" claim value', "iss", "check_failed");
  }
  if (subject && payload.sub !== subject) {
    throw new JWTClaimValidationFailed('unexpected "sub" claim value', "sub", "check_failed");
  }
  if (audience && !checkAudiencePresence(payload.aud, typeof audience === "string" ? [audience] : audience)) {
    throw new JWTClaimValidationFailed('unexpected "aud" claim value', "aud", "check_failed");
  }
  let tolerance;
  switch (typeof options.clockTolerance) {
    case "string":
      tolerance = secs_default(options.clockTolerance);
      break;
    case "number":
      tolerance = options.clockTolerance;
      break;
    case "undefined":
      tolerance = 0;
      break;
    default:
      throw new TypeError("Invalid clockTolerance option type");
  }
  const { currentDate } = options;
  const now = epoch_default(currentDate || /* @__PURE__ */ new Date());
  if ((payload.iat !== void 0 || maxTokenAge) && typeof payload.iat !== "number") {
    throw new JWTClaimValidationFailed('"iat" claim must be a number', "iat", "invalid");
  }
  if (payload.nbf !== void 0) {
    if (typeof payload.nbf !== "number") {
      throw new JWTClaimValidationFailed('"nbf" claim must be a number', "nbf", "invalid");
    }
    if (payload.nbf > now + tolerance) {
      throw new JWTClaimValidationFailed('"nbf" claim timestamp check failed', "nbf", "check_failed");
    }
  }
  if (payload.exp !== void 0) {
    if (typeof payload.exp !== "number") {
      throw new JWTClaimValidationFailed('"exp" claim must be a number', "exp", "invalid");
    }
    if (payload.exp <= now - tolerance) {
      throw new JWTExpired('"exp" claim timestamp check failed', "exp", "check_failed");
    }
  }
  if (maxTokenAge) {
    const age = now - payload.iat;
    const max = typeof maxTokenAge === "number" ? maxTokenAge : secs_default(maxTokenAge);
    if (age - tolerance > max) {
      throw new JWTExpired('"iat" claim timestamp check failed (too far in the past)', "iat", "check_failed");
    }
    if (age < 0 - tolerance) {
      throw new JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', "iat", "check_failed");
    }
  }
  return payload;
};

// node_modules/jose/dist/browser/jwt/verify.js
function jwtVerify(jwt, key, options) {
  return __async(this, null, function* () {
    const verified = yield compactVerify(jwt, key, options);
    if (verified.protectedHeader.crit?.includes("b64") && verified.protectedHeader.b64 === false) {
      throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
    }
    const payload = jwt_claims_set_default(verified.protectedHeader, verified.payload, options);
    const result = { payload, protectedHeader: verified.protectedHeader };
    if (typeof key === "function") {
      return __spreadProps(__spreadValues({}, result), { key: verified.key });
    }
    return result;
  });
}

// node_modules/jose/dist/browser/jwt/decrypt.js
function jwtDecrypt(jwt, key, options) {
  return __async(this, null, function* () {
    const decrypted = yield compactDecrypt(jwt, key, options);
    const payload = jwt_claims_set_default(decrypted.protectedHeader, decrypted.plaintext, options);
    const { protectedHeader } = decrypted;
    if (protectedHeader.iss !== void 0 && protectedHeader.iss !== payload.iss) {
      throw new JWTClaimValidationFailed('replicated "iss" claim header parameter mismatch', "iss", "mismatch");
    }
    if (protectedHeader.sub !== void 0 && protectedHeader.sub !== payload.sub) {
      throw new JWTClaimValidationFailed('replicated "sub" claim header parameter mismatch', "sub", "mismatch");
    }
    if (protectedHeader.aud !== void 0 && JSON.stringify(protectedHeader.aud) !== JSON.stringify(payload.aud)) {
      throw new JWTClaimValidationFailed('replicated "aud" claim header parameter mismatch', "aud", "mismatch");
    }
    const result = { payload, protectedHeader };
    if (typeof key === "function") {
      return __spreadProps(__spreadValues({}, result), { key: decrypted.key });
    }
    return result;
  });
}

// node_modules/jose/dist/browser/jwe/compact/encrypt.js
var CompactEncrypt = class {
  constructor(plaintext) {
    this._flattened = new FlattenedEncrypt(plaintext);
  }
  setContentEncryptionKey(cek) {
    this._flattened.setContentEncryptionKey(cek);
    return this;
  }
  setInitializationVector(iv) {
    this._flattened.setInitializationVector(iv);
    return this;
  }
  setProtectedHeader(protectedHeader) {
    this._flattened.setProtectedHeader(protectedHeader);
    return this;
  }
  setKeyManagementParameters(parameters) {
    this._flattened.setKeyManagementParameters(parameters);
    return this;
  }
  encrypt(key, options) {
    return __async(this, null, function* () {
      const jwe = yield this._flattened.encrypt(key, options);
      return [jwe.protected, jwe.encrypted_key, jwe.iv, jwe.ciphertext, jwe.tag].join(".");
    });
  }
};

// node_modules/jose/dist/browser/runtime/sign.js
var sign = (alg, key, data) => __async(void 0, null, function* () {
  const cryptoKey = yield getCryptoKey3(alg, key, "sign");
  check_key_length_default(alg, cryptoKey);
  const signature = yield webcrypto_default.subtle.sign(subtleDsa(alg, cryptoKey.algorithm), cryptoKey, data);
  return new Uint8Array(signature);
});
var sign_default = sign;

// node_modules/jose/dist/browser/jws/flattened/sign.js
var FlattenedSign = class {
  constructor(payload) {
    if (!(payload instanceof Uint8Array)) {
      throw new TypeError("payload must be an instance of Uint8Array");
    }
    this._payload = payload;
  }
  setProtectedHeader(protectedHeader) {
    if (this._protectedHeader) {
      throw new TypeError("setProtectedHeader can only be called once");
    }
    this._protectedHeader = protectedHeader;
    return this;
  }
  setUnprotectedHeader(unprotectedHeader) {
    if (this._unprotectedHeader) {
      throw new TypeError("setUnprotectedHeader can only be called once");
    }
    this._unprotectedHeader = unprotectedHeader;
    return this;
  }
  sign(key, options) {
    return __async(this, null, function* () {
      if (!this._protectedHeader && !this._unprotectedHeader) {
        throw new JWSInvalid("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
      }
      if (!is_disjoint_default(this._protectedHeader, this._unprotectedHeader)) {
        throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
      }
      const joseHeader = __spreadValues(__spreadValues({}, this._protectedHeader), this._unprotectedHeader);
      const extensions = validate_crit_default(JWSInvalid, /* @__PURE__ */ new Map([["b64", true]]), options?.crit, this._protectedHeader, joseHeader);
      let b64 = true;
      if (extensions.has("b64")) {
        b64 = this._protectedHeader.b64;
        if (typeof b64 !== "boolean") {
          throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
        }
      }
      const { alg } = joseHeader;
      if (typeof alg !== "string" || !alg) {
        throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
      }
      check_key_type_default(alg, key, "sign");
      let payload = this._payload;
      if (b64) {
        payload = encoder.encode(encode(payload));
      }
      let protectedHeader;
      if (this._protectedHeader) {
        protectedHeader = encoder.encode(encode(JSON.stringify(this._protectedHeader)));
      } else {
        protectedHeader = encoder.encode("");
      }
      const data = concat(protectedHeader, encoder.encode("."), payload);
      const signature = yield sign_default(alg, key, data);
      const jws = {
        signature: encode(signature),
        payload: ""
      };
      if (b64) {
        jws.payload = decoder.decode(payload);
      }
      if (this._unprotectedHeader) {
        jws.header = this._unprotectedHeader;
      }
      if (this._protectedHeader) {
        jws.protected = decoder.decode(protectedHeader);
      }
      return jws;
    });
  }
};

// node_modules/jose/dist/browser/jws/compact/sign.js
var CompactSign = class {
  constructor(payload) {
    this._flattened = new FlattenedSign(payload);
  }
  setProtectedHeader(protectedHeader) {
    this._flattened.setProtectedHeader(protectedHeader);
    return this;
  }
  sign(key, options) {
    return __async(this, null, function* () {
      const jws = yield this._flattened.sign(key, options);
      if (jws.payload === void 0) {
        throw new TypeError("use the flattened module for creating JWS with b64: false");
      }
      return `${jws.protected}.${jws.payload}.${jws.signature}`;
    });
  }
};

// node_modules/jose/dist/browser/jws/general/sign.js
var IndividualSignature = class {
  constructor(sig, key, options) {
    this.parent = sig;
    this.key = key;
    this.options = options;
  }
  setProtectedHeader(protectedHeader) {
    if (this.protectedHeader) {
      throw new TypeError("setProtectedHeader can only be called once");
    }
    this.protectedHeader = protectedHeader;
    return this;
  }
  setUnprotectedHeader(unprotectedHeader) {
    if (this.unprotectedHeader) {
      throw new TypeError("setUnprotectedHeader can only be called once");
    }
    this.unprotectedHeader = unprotectedHeader;
    return this;
  }
  addSignature(...args) {
    return this.parent.addSignature(...args);
  }
  sign(...args) {
    return this.parent.sign(...args);
  }
  done() {
    return this.parent;
  }
};
var GeneralSign = class {
  constructor(payload) {
    this._signatures = [];
    this._payload = payload;
  }
  addSignature(key, options) {
    const signature = new IndividualSignature(this, key, options);
    this._signatures.push(signature);
    return signature;
  }
  sign() {
    return __async(this, null, function* () {
      if (!this._signatures.length) {
        throw new JWSInvalid("at least one signature must be added");
      }
      const jws = {
        signatures: [],
        payload: ""
      };
      for (let i = 0; i < this._signatures.length; i++) {
        const signature = this._signatures[i];
        const flattened = new FlattenedSign(this._payload);
        flattened.setProtectedHeader(signature.protectedHeader);
        flattened.setUnprotectedHeader(signature.unprotectedHeader);
        const _a = yield flattened.sign(signature.key, signature.options), { payload } = _a, rest = __objRest(_a, ["payload"]);
        if (i === 0) {
          jws.payload = payload;
        } else if (jws.payload !== payload) {
          throw new JWSInvalid("inconsistent use of JWS Unencoded Payload (RFC7797)");
        }
        jws.signatures.push(rest);
      }
      return jws;
    });
  }
};

// node_modules/jose/dist/browser/jwt/produce.js
function validateInput(label, input) {
  if (!Number.isFinite(input)) {
    throw new TypeError(`Invalid ${label} input`);
  }
  return input;
}
var ProduceJWT = class {
  constructor(payload = {}) {
    if (!isObject(payload)) {
      throw new TypeError("JWT Claims Set MUST be an object");
    }
    this._payload = payload;
  }
  setIssuer(issuer) {
    this._payload = __spreadProps(__spreadValues({}, this._payload), { iss: issuer });
    return this;
  }
  setSubject(subject) {
    this._payload = __spreadProps(__spreadValues({}, this._payload), { sub: subject });
    return this;
  }
  setAudience(audience) {
    this._payload = __spreadProps(__spreadValues({}, this._payload), { aud: audience });
    return this;
  }
  setJti(jwtId) {
    this._payload = __spreadProps(__spreadValues({}, this._payload), { jti: jwtId });
    return this;
  }
  setNotBefore(input) {
    if (typeof input === "number") {
      this._payload = __spreadProps(__spreadValues({}, this._payload), { nbf: validateInput("setNotBefore", input) });
    } else if (input instanceof Date) {
      this._payload = __spreadProps(__spreadValues({}, this._payload), { nbf: validateInput("setNotBefore", epoch_default(input)) });
    } else {
      this._payload = __spreadProps(__spreadValues({}, this._payload), { nbf: epoch_default(/* @__PURE__ */ new Date()) + secs_default(input) });
    }
    return this;
  }
  setExpirationTime(input) {
    if (typeof input === "number") {
      this._payload = __spreadProps(__spreadValues({}, this._payload), { exp: validateInput("setExpirationTime", input) });
    } else if (input instanceof Date) {
      this._payload = __spreadProps(__spreadValues({}, this._payload), { exp: validateInput("setExpirationTime", epoch_default(input)) });
    } else {
      this._payload = __spreadProps(__spreadValues({}, this._payload), { exp: epoch_default(/* @__PURE__ */ new Date()) + secs_default(input) });
    }
    return this;
  }
  setIssuedAt(input) {
    if (typeof input === "undefined") {
      this._payload = __spreadProps(__spreadValues({}, this._payload), { iat: epoch_default(/* @__PURE__ */ new Date()) });
    } else if (input instanceof Date) {
      this._payload = __spreadProps(__spreadValues({}, this._payload), { iat: validateInput("setIssuedAt", epoch_default(input)) });
    } else if (typeof input === "string") {
      this._payload = __spreadProps(__spreadValues({}, this._payload), {
        iat: validateInput("setIssuedAt", epoch_default(/* @__PURE__ */ new Date()) + secs_default(input))
      });
    } else {
      this._payload = __spreadProps(__spreadValues({}, this._payload), { iat: validateInput("setIssuedAt", input) });
    }
    return this;
  }
};

// node_modules/jose/dist/browser/jwt/sign.js
var SignJWT = class extends ProduceJWT {
  setProtectedHeader(protectedHeader) {
    this._protectedHeader = protectedHeader;
    return this;
  }
  sign(key, options) {
    return __async(this, null, function* () {
      const sig = new CompactSign(encoder.encode(JSON.stringify(this._payload)));
      sig.setProtectedHeader(this._protectedHeader);
      if (Array.isArray(this._protectedHeader?.crit) && this._protectedHeader.crit.includes("b64") && this._protectedHeader.b64 === false) {
        throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
      }
      return sig.sign(key, options);
    });
  }
};

// node_modules/jose/dist/browser/jwt/encrypt.js
var EncryptJWT = class extends ProduceJWT {
  setProtectedHeader(protectedHeader) {
    if (this._protectedHeader) {
      throw new TypeError("setProtectedHeader can only be called once");
    }
    this._protectedHeader = protectedHeader;
    return this;
  }
  setKeyManagementParameters(parameters) {
    if (this._keyManagementParameters) {
      throw new TypeError("setKeyManagementParameters can only be called once");
    }
    this._keyManagementParameters = parameters;
    return this;
  }
  setContentEncryptionKey(cek) {
    if (this._cek) {
      throw new TypeError("setContentEncryptionKey can only be called once");
    }
    this._cek = cek;
    return this;
  }
  setInitializationVector(iv) {
    if (this._iv) {
      throw new TypeError("setInitializationVector can only be called once");
    }
    this._iv = iv;
    return this;
  }
  replicateIssuerAsHeader() {
    this._replicateIssuerAsHeader = true;
    return this;
  }
  replicateSubjectAsHeader() {
    this._replicateSubjectAsHeader = true;
    return this;
  }
  replicateAudienceAsHeader() {
    this._replicateAudienceAsHeader = true;
    return this;
  }
  encrypt(key, options) {
    return __async(this, null, function* () {
      const enc = new CompactEncrypt(encoder.encode(JSON.stringify(this._payload)));
      if (this._replicateIssuerAsHeader) {
        this._protectedHeader = __spreadProps(__spreadValues({}, this._protectedHeader), { iss: this._payload.iss });
      }
      if (this._replicateSubjectAsHeader) {
        this._protectedHeader = __spreadProps(__spreadValues({}, this._protectedHeader), { sub: this._payload.sub });
      }
      if (this._replicateAudienceAsHeader) {
        this._protectedHeader = __spreadProps(__spreadValues({}, this._protectedHeader), { aud: this._payload.aud });
      }
      enc.setProtectedHeader(this._protectedHeader);
      if (this._iv) {
        enc.setInitializationVector(this._iv);
      }
      if (this._cek) {
        enc.setContentEncryptionKey(this._cek);
      }
      if (this._keyManagementParameters) {
        enc.setKeyManagementParameters(this._keyManagementParameters);
      }
      return enc.encrypt(key, options);
    });
  }
};

// node_modules/jose/dist/browser/jwk/thumbprint.js
var check = (value, description) => {
  if (typeof value !== "string" || !value) {
    throw new JWKInvalid(`${description} missing or invalid`);
  }
};
function calculateJwkThumbprint(jwk, digestAlgorithm) {
  return __async(this, null, function* () {
    if (!isObject(jwk)) {
      throw new TypeError("JWK must be an object");
    }
    digestAlgorithm ?? (digestAlgorithm = "sha256");
    if (digestAlgorithm !== "sha256" && digestAlgorithm !== "sha384" && digestAlgorithm !== "sha512") {
      throw new TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
    }
    let components;
    switch (jwk.kty) {
      case "EC":
        check(jwk.crv, '"crv" (Curve) Parameter');
        check(jwk.x, '"x" (X Coordinate) Parameter');
        check(jwk.y, '"y" (Y Coordinate) Parameter');
        components = { crv: jwk.crv, kty: jwk.kty, x: jwk.x, y: jwk.y };
        break;
      case "OKP":
        check(jwk.crv, '"crv" (Subtype of Key Pair) Parameter');
        check(jwk.x, '"x" (Public Key) Parameter');
        components = { crv: jwk.crv, kty: jwk.kty, x: jwk.x };
        break;
      case "RSA":
        check(jwk.e, '"e" (Exponent) Parameter');
        check(jwk.n, '"n" (Modulus) Parameter');
        components = { e: jwk.e, kty: jwk.kty, n: jwk.n };
        break;
      case "oct":
        check(jwk.k, '"k" (Key Value) Parameter');
        components = { k: jwk.k, kty: jwk.kty };
        break;
      default:
        throw new JOSENotSupported('"kty" (Key Type) Parameter missing or unsupported');
    }
    const data = encoder.encode(JSON.stringify(components));
    return encode(yield digest_default(digestAlgorithm, data));
  });
}
function calculateJwkThumbprintUri(jwk, digestAlgorithm) {
  return __async(this, null, function* () {
    digestAlgorithm ?? (digestAlgorithm = "sha256");
    const thumbprint = yield calculateJwkThumbprint(jwk, digestAlgorithm);
    return `urn:ietf:params:oauth:jwk-thumbprint:sha-${digestAlgorithm.slice(-3)}:${thumbprint}`;
  });
}

// node_modules/jose/dist/browser/jwk/embedded.js
function EmbeddedJWK(protectedHeader, token) {
  return __async(this, null, function* () {
    const joseHeader = __spreadValues(__spreadValues({}, protectedHeader), token?.header);
    if (!isObject(joseHeader.jwk)) {
      throw new JWSInvalid('"jwk" (JSON Web Key) Header Parameter must be a JSON object');
    }
    const key = yield importJWK(__spreadProps(__spreadValues({}, joseHeader.jwk), { ext: true }), joseHeader.alg);
    if (key instanceof Uint8Array || key.type !== "public") {
      throw new JWSInvalid('"jwk" (JSON Web Key) Header Parameter must be a public key');
    }
    return key;
  });
}

// node_modules/jose/dist/browser/jwks/local.js
function getKtyFromAlg(alg) {
  switch (typeof alg === "string" && alg.slice(0, 2)) {
    case "RS":
    case "PS":
      return "RSA";
    case "ES":
      return "EC";
    case "Ed":
      return "OKP";
    default:
      throw new JOSENotSupported('Unsupported "alg" value for a JSON Web Key Set');
  }
}
function isJWKSLike(jwks) {
  return jwks && typeof jwks === "object" && Array.isArray(jwks.keys) && jwks.keys.every(isJWKLike);
}
function isJWKLike(key) {
  return isObject(key);
}
function clone(obj) {
  if (typeof structuredClone === "function") {
    return structuredClone(obj);
  }
  return JSON.parse(JSON.stringify(obj));
}
var LocalJWKSet = class {
  constructor(jwks) {
    this._cached = /* @__PURE__ */ new WeakMap();
    if (!isJWKSLike(jwks)) {
      throw new JWKSInvalid("JSON Web Key Set malformed");
    }
    this._jwks = clone(jwks);
  }
  getKey(protectedHeader, token) {
    return __async(this, null, function* () {
      const { alg, kid } = __spreadValues(__spreadValues({}, protectedHeader), token?.header);
      const kty = getKtyFromAlg(alg);
      const candidates = this._jwks.keys.filter((jwk2) => {
        let candidate = kty === jwk2.kty;
        if (candidate && typeof kid === "string") {
          candidate = kid === jwk2.kid;
        }
        if (candidate && typeof jwk2.alg === "string") {
          candidate = alg === jwk2.alg;
        }
        if (candidate && typeof jwk2.use === "string") {
          candidate = jwk2.use === "sig";
        }
        if (candidate && Array.isArray(jwk2.key_ops)) {
          candidate = jwk2.key_ops.includes("verify");
        }
        if (candidate && alg === "EdDSA") {
          candidate = jwk2.crv === "Ed25519" || jwk2.crv === "Ed448";
        }
        if (candidate) {
          switch (alg) {
            case "ES256":
              candidate = jwk2.crv === "P-256";
              break;
            case "ES256K":
              candidate = jwk2.crv === "secp256k1";
              break;
            case "ES384":
              candidate = jwk2.crv === "P-384";
              break;
            case "ES512":
              candidate = jwk2.crv === "P-521";
              break;
          }
        }
        return candidate;
      });
      const { 0: jwk, length } = candidates;
      if (length === 0) {
        throw new JWKSNoMatchingKey();
      }
      if (length !== 1) {
        const error = new JWKSMultipleMatchingKeys();
        const { _cached } = this;
        error[Symbol.asyncIterator] = function() {
          return __asyncGenerator(this, null, function* () {
            for (const jwk2 of candidates) {
              try {
                yield yield new __await(importWithAlgCache(_cached, jwk2, alg));
              } catch {
              }
            }
          });
        };
        throw error;
      }
      return importWithAlgCache(this._cached, jwk, alg);
    });
  }
};
function importWithAlgCache(cache, jwk, alg) {
  return __async(this, null, function* () {
    const cached = cache.get(jwk) || cache.set(jwk, {}).get(jwk);
    if (cached[alg] === void 0) {
      const key = yield importJWK(__spreadProps(__spreadValues({}, jwk), { ext: true }), alg);
      if (key instanceof Uint8Array || key.type !== "public") {
        throw new JWKSInvalid("JSON Web Key Set members must be public keys");
      }
      cached[alg] = key;
    }
    return cached[alg];
  });
}
function createLocalJWKSet(jwks) {
  const set = new LocalJWKSet(jwks);
  return (protectedHeader, token) => __async(this, null, function* () {
    return set.getKey(protectedHeader, token);
  });
}

// node_modules/jose/dist/browser/runtime/fetch_jwks.js
var fetchJwks = (url, timeout, options) => __async(void 0, null, function* () {
  let controller;
  let id;
  let timedOut = false;
  if (typeof AbortController === "function") {
    controller = new AbortController();
    id = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, timeout);
  }
  const response = yield fetch(url.href, {
    signal: controller ? controller.signal : void 0,
    redirect: "manual",
    headers: options.headers
  }).catch((err) => {
    if (timedOut)
      throw new JWKSTimeout();
    throw err;
  });
  if (id !== void 0)
    clearTimeout(id);
  if (response.status !== 200) {
    throw new JOSEError("Expected 200 OK from the JSON Web Key Set HTTP response");
  }
  try {
    return yield response.json();
  } catch {
    throw new JOSEError("Failed to parse the JSON Web Key Set HTTP response as JSON");
  }
});
var fetch_jwks_default = fetchJwks;

// node_modules/jose/dist/browser/jwks/remote.js
function isCloudflareWorkers() {
  return typeof WebSocketPair !== "undefined" || typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers" || typeof EdgeRuntime !== "undefined" && EdgeRuntime === "vercel";
}
var USER_AGENT;
if (typeof navigator === "undefined" || !navigator.userAgent?.startsWith?.("Mozilla/5.0 ")) {
  const NAME = "jose";
  const VERSION = "v5.2.3";
  USER_AGENT = `${NAME}/${VERSION}`;
}
var RemoteJWKSet = class _RemoteJWKSet extends LocalJWKSet {
  constructor(url, options) {
    super({ keys: [] });
    this._jwks = void 0;
    if (!(url instanceof URL)) {
      throw new TypeError("url must be an instance of URL");
    }
    this._url = new URL(url.href);
    this._options = { agent: options?.agent, headers: options?.headers };
    this._timeoutDuration = typeof options?.timeoutDuration === "number" ? options?.timeoutDuration : 5e3;
    this._cooldownDuration = typeof options?.cooldownDuration === "number" ? options?.cooldownDuration : 3e4;
    this._cacheMaxAge = typeof options?.cacheMaxAge === "number" ? options?.cacheMaxAge : 6e5;
  }
  coolingDown() {
    return typeof this._jwksTimestamp === "number" ? Date.now() < this._jwksTimestamp + this._cooldownDuration : false;
  }
  fresh() {
    return typeof this._jwksTimestamp === "number" ? Date.now() < this._jwksTimestamp + this._cacheMaxAge : false;
  }
  getKey(protectedHeader, token) {
    return __async(this, null, function* () {
      if (!this._jwks || !this.fresh()) {
        yield this.reload();
      }
      try {
        return yield __superGet(_RemoteJWKSet.prototype, this, "getKey").call(this, protectedHeader, token);
      } catch (err) {
        if (err instanceof JWKSNoMatchingKey) {
          if (this.coolingDown() === false) {
            yield this.reload();
            return __superGet(_RemoteJWKSet.prototype, this, "getKey").call(this, protectedHeader, token);
          }
        }
        throw err;
      }
    });
  }
  reload() {
    return __async(this, null, function* () {
      if (this._pendingFetch && isCloudflareWorkers()) {
        this._pendingFetch = void 0;
      }
      const headers = new Headers(this._options.headers);
      if (USER_AGENT && !headers.has("User-Agent")) {
        headers.set("User-Agent", USER_AGENT);
        this._options.headers = Object.fromEntries(headers.entries());
      }
      this._pendingFetch || (this._pendingFetch = fetch_jwks_default(this._url, this._timeoutDuration, this._options).then((json) => {
        if (!isJWKSLike(json)) {
          throw new JWKSInvalid("JSON Web Key Set malformed");
        }
        this._jwks = { keys: json.keys };
        this._jwksTimestamp = Date.now();
        this._pendingFetch = void 0;
      }).catch((err) => {
        this._pendingFetch = void 0;
        throw err;
      }));
      yield this._pendingFetch;
    });
  }
};
function createRemoteJWKSet(url, options) {
  const set = new RemoteJWKSet(url, options);
  return (protectedHeader, token) => __async(this, null, function* () {
    return set.getKey(protectedHeader, token);
  });
}

// node_modules/jose/dist/browser/jwt/unsecured.js
var UnsecuredJWT = class extends ProduceJWT {
  encode() {
    const header = encode(JSON.stringify({ alg: "none" }));
    const payload = encode(JSON.stringify(this._payload));
    return `${header}.${payload}.`;
  }
  static decode(jwt, options) {
    if (typeof jwt !== "string") {
      throw new JWTInvalid("Unsecured JWT must be a string");
    }
    const { 0: encodedHeader, 1: encodedPayload, 2: signature, length } = jwt.split(".");
    if (length !== 3 || signature !== "") {
      throw new JWTInvalid("Invalid Unsecured JWT");
    }
    let header;
    try {
      header = JSON.parse(decoder.decode(decode(encodedHeader)));
      if (header.alg !== "none")
        throw new Error();
    } catch {
      throw new JWTInvalid("Invalid Unsecured JWT");
    }
    const payload = jwt_claims_set_default(header, decode(encodedPayload), options);
    return { payload, header };
  }
};

// node_modules/jose/dist/browser/util/base64url.js
var base64url_exports2 = {};
__export(base64url_exports2, {
  decode: () => decode2,
  encode: () => encode2
});
var encode2 = encode;
var decode2 = decode;

// node_modules/jose/dist/browser/util/decode_protected_header.js
function decodeProtectedHeader(token) {
  let protectedB64u;
  if (typeof token === "string") {
    const parts = token.split(".");
    if (parts.length === 3 || parts.length === 5) {
      ;
      [protectedB64u] = parts;
    }
  } else if (typeof token === "object" && token) {
    if ("protected" in token) {
      protectedB64u = token.protected;
    } else {
      throw new TypeError("Token does not contain a Protected Header");
    }
  }
  try {
    if (typeof protectedB64u !== "string" || !protectedB64u) {
      throw new Error();
    }
    const result = JSON.parse(decoder.decode(decode2(protectedB64u)));
    if (!isObject(result)) {
      throw new Error();
    }
    return result;
  } catch {
    throw new TypeError("Invalid Token or Protected Header formatting");
  }
}

// node_modules/jose/dist/browser/util/decode_jwt.js
function decodeJwt(jwt) {
  if (typeof jwt !== "string")
    throw new JWTInvalid("JWTs must use Compact JWS serialization, JWT must be a string");
  const { 1: payload, length } = jwt.split(".");
  if (length === 5)
    throw new JWTInvalid("Only JWTs using Compact JWS serialization can be decoded");
  if (length !== 3)
    throw new JWTInvalid("Invalid JWT");
  if (!payload)
    throw new JWTInvalid("JWTs must contain a payload");
  let decoded;
  try {
    decoded = decode2(payload);
  } catch {
    throw new JWTInvalid("Failed to base64url decode the payload");
  }
  let result;
  try {
    result = JSON.parse(decoder.decode(decoded));
  } catch {
    throw new JWTInvalid("Failed to parse the decoded payload as JSON");
  }
  if (!isObject(result))
    throw new JWTInvalid("Invalid JWT Claims Set");
  return result;
}

// node_modules/jose/dist/browser/runtime/generate.js
function generateSecret(alg, options) {
  return __async(this, null, function* () {
    let length;
    let algorithm;
    let keyUsages;
    switch (alg) {
      case "HS256":
      case "HS384":
      case "HS512":
        length = parseInt(alg.slice(-3), 10);
        algorithm = { name: "HMAC", hash: `SHA-${length}`, length };
        keyUsages = ["sign", "verify"];
        break;
      case "A128CBC-HS256":
      case "A192CBC-HS384":
      case "A256CBC-HS512":
        length = parseInt(alg.slice(-3), 10);
        return random_default(new Uint8Array(length >> 3));
      case "A128KW":
      case "A192KW":
      case "A256KW":
        length = parseInt(alg.slice(1, 4), 10);
        algorithm = { name: "AES-KW", length };
        keyUsages = ["wrapKey", "unwrapKey"];
        break;
      case "A128GCMKW":
      case "A192GCMKW":
      case "A256GCMKW":
      case "A128GCM":
      case "A192GCM":
      case "A256GCM":
        length = parseInt(alg.slice(1, 4), 10);
        algorithm = { name: "AES-GCM", length };
        keyUsages = ["encrypt", "decrypt"];
        break;
      default:
        throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
    }
    return webcrypto_default.subtle.generateKey(algorithm, options?.extractable ?? false, keyUsages);
  });
}
function getModulusLengthOption(options) {
  const modulusLength = options?.modulusLength ?? 2048;
  if (typeof modulusLength !== "number" || modulusLength < 2048) {
    throw new JOSENotSupported("Invalid or unsupported modulusLength option provided, 2048 bits or larger keys must be used");
  }
  return modulusLength;
}
function generateKeyPair(alg, options) {
  return __async(this, null, function* () {
    let algorithm;
    let keyUsages;
    switch (alg) {
      case "PS256":
      case "PS384":
      case "PS512":
        algorithm = {
          name: "RSA-PSS",
          hash: `SHA-${alg.slice(-3)}`,
          publicExponent: new Uint8Array([1, 0, 1]),
          modulusLength: getModulusLengthOption(options)
        };
        keyUsages = ["sign", "verify"];
        break;
      case "RS256":
      case "RS384":
      case "RS512":
        algorithm = {
          name: "RSASSA-PKCS1-v1_5",
          hash: `SHA-${alg.slice(-3)}`,
          publicExponent: new Uint8Array([1, 0, 1]),
          modulusLength: getModulusLengthOption(options)
        };
        keyUsages = ["sign", "verify"];
        break;
      case "RSA-OAEP":
      case "RSA-OAEP-256":
      case "RSA-OAEP-384":
      case "RSA-OAEP-512":
        algorithm = {
          name: "RSA-OAEP",
          hash: `SHA-${parseInt(alg.slice(-3), 10) || 1}`,
          publicExponent: new Uint8Array([1, 0, 1]),
          modulusLength: getModulusLengthOption(options)
        };
        keyUsages = ["decrypt", "unwrapKey", "encrypt", "wrapKey"];
        break;
      case "ES256":
        algorithm = { name: "ECDSA", namedCurve: "P-256" };
        keyUsages = ["sign", "verify"];
        break;
      case "ES384":
        algorithm = { name: "ECDSA", namedCurve: "P-384" };
        keyUsages = ["sign", "verify"];
        break;
      case "ES512":
        algorithm = { name: "ECDSA", namedCurve: "P-521" };
        keyUsages = ["sign", "verify"];
        break;
      case "EdDSA": {
        keyUsages = ["sign", "verify"];
        const crv = options?.crv ?? "Ed25519";
        switch (crv) {
          case "Ed25519":
          case "Ed448":
            algorithm = { name: crv };
            break;
          default:
            throw new JOSENotSupported("Invalid or unsupported crv option provided");
        }
        break;
      }
      case "ECDH-ES":
      case "ECDH-ES+A128KW":
      case "ECDH-ES+A192KW":
      case "ECDH-ES+A256KW": {
        keyUsages = ["deriveKey", "deriveBits"];
        const crv = options?.crv ?? "P-256";
        switch (crv) {
          case "P-256":
          case "P-384":
          case "P-521": {
            algorithm = { name: "ECDH", namedCurve: crv };
            break;
          }
          case "X25519":
          case "X448":
            algorithm = { name: crv };
            break;
          default:
            throw new JOSENotSupported("Invalid or unsupported crv option provided, supported values are P-256, P-384, P-521, X25519, and X448");
        }
        break;
      }
      default:
        throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
    }
    return webcrypto_default.subtle.generateKey(algorithm, options?.extractable ?? false, keyUsages);
  });
}

// node_modules/jose/dist/browser/key/generate_key_pair.js
function generateKeyPair2(alg, options) {
  return __async(this, null, function* () {
    return generateKeyPair(alg, options);
  });
}

// node_modules/jose/dist/browser/key/generate_secret.js
function generateSecret2(alg, options) {
  return __async(this, null, function* () {
    return generateSecret(alg, options);
  });
}

// node_modules/jose/dist/browser/runtime/runtime.js
var runtime_default = "WebCryptoAPI";

// node_modules/jose/dist/browser/util/runtime.js
var runtime_default2 = runtime_default;
export {
  CompactEncrypt,
  CompactSign,
  EmbeddedJWK,
  EncryptJWT,
  FlattenedEncrypt,
  FlattenedSign,
  GeneralEncrypt,
  GeneralSign,
  SignJWT,
  UnsecuredJWT,
  base64url_exports2 as base64url,
  calculateJwkThumbprint,
  calculateJwkThumbprintUri,
  compactDecrypt,
  compactVerify,
  createLocalJWKSet,
  createRemoteJWKSet,
  runtime_default2 as cryptoRuntime,
  decodeJwt,
  decodeProtectedHeader,
  errors_exports as errors,
  exportJWK,
  exportPKCS8,
  exportSPKI,
  flattenedDecrypt,
  flattenedVerify,
  generalDecrypt,
  generalVerify,
  generateKeyPair2 as generateKeyPair,
  generateSecret2 as generateSecret,
  importJWK,
  importPKCS8,
  importSPKI,
  importX509,
  jwtDecrypt,
  jwtVerify
};
//# sourceMappingURL=jose.js.map
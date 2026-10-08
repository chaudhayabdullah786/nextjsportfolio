import { verifyWerkzeugScrypt } from '../lib/auth/password';

describe('verifyWerkzeugScrypt', () => {
  const testPassword = 'test-password';
  const testHash = 'scrypt:16384:8:1$JaWj8cSjBWMoV251cjg2tQ$fd1N7Lb0Hq3sPolVUvcCaVIET9f7HD7gOyAmuW_zH9nEDXAdRI9wfizCudZkWKc35CI4y9Kx1umg6wm5sydAWw';

  it('should return true for a correct password', async () => {
    const result = await verifyWerkzeugScrypt(testPassword, testHash);
    expect(result).toBe(true);
  });

  it('should return false for an incorrect password', async () => {
    const result = await verifyWerkzeugScrypt('wrong-password', testHash);
    expect(result).toBe(false);
  });

  it('should return false for an invalid hash format', async () => {
    const result = await verifyWerkzeugScrypt(testPassword, 'invalid_hash_format');
    expect(result).toBe(false);
  });
});

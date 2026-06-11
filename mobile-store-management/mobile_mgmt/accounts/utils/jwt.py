import jwt
from django.conf import settings
from datetime import datetime, timedelta
import json


def _read_key(path: str) -> str:
    try:
        with open(path, 'r') as f:
            return f.read()
    except Exception:
        return ''


def create_access_token(user_id: str, permissions: list[str], extra: dict = None) -> str:
    private_key = _read_key(settings.JWT_PRIVATE_KEY_PATH)
    now = datetime.utcnow()
    payload = {
        'iss': 'mobile-mgmt',
        'sub': str(user_id),
        'aud': 'mobile-api',
        'iat': int(now.timestamp()),
        'exp': int((now + timedelta(seconds=settings.ACCESS_TOKEN_LIFETIME)).timestamp()),
        'perms': permissions,
    }
    if extra:
        payload.update(extra)
    token = jwt.encode(payload, private_key, algorithm=settings.JWT_ALGORITHM)
    return token


def decode_token(token: str) -> dict:
    public_key = _read_key(settings.JWT_PUBLIC_KEY_PATH)
    return jwt.decode(token, public_key, algorithms=[settings.JWT_ALGORITHM], audience='mobile-api')

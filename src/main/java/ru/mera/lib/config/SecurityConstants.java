package ru.mera.lib.config;

public class SecurityConstants {

    public static final String SECRET = "SecretKey";
    public static final long EXPIRATION_TIME = 28_800_000; // 8 hours
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String AUTHORITIES_KEY = "roles";
}

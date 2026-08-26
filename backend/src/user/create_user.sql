create table users (
    id integer generated always as identity primary key,

    name varchar(255) not null,
    email varchar(255) not null,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    constraint users_email_unique unique (email),
    constraint users_email_valid check (
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    )
);

create table user_passwords (
    id integer generated always as identity primary key,

    user_id integer not null unique
        references users(id)
        on delete cascade,

    password_hash text not null,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


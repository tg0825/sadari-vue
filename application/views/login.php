<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>login</title>
        <style media="screen">
            .layout-login .wrap {
                max-width: 360px;
                margin: 0 auto;
                text-align: center;
            }

            input {
                width: 100%;
                font-size: 14px;
                padding: 5px;
                box-sizing: border-box;
            }

            button {
                border: 1px solid #ddd;
                width: 100%;
                padding: 5px;
                font-size: 14px;
                margin-top: 10px;
            }

            a {
                display: block;
                margin-top: 10px;
                font-size: 12px;
            }
        </style>
    </head>
    <body class="layout-login page-login">
        <div class="wrap">
            <h1>로그인</h1>
            <form class="" action="login-process.php" method="post">
                <div>
                    <input
                        type="text"
                        placeholder="아이디"
                        name="member_id"
                    >
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="비밀번호"
                        name="member_password"
                    >
                </div>
                <div>
                    <button type="submit" name="button">전송</button>
                </div>
            </form>
            <a href="/">메인으로</a>
            <!-- <a href="/signup.php">회원가입</a> -->
        </div>
    </body>
</html>

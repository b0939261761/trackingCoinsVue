@ECHO OFF
REM COPY build to folder Rails Project

SET PATH_FROM=dist
SET PATH_TO=..\trackingCoinsRails\site

DEL /S /Q "%PATH_TO%\*.*"
FOR /D %%* IN ("%PATH_TO%\*") DO RMDIR /S /Q "%%*"

XCOPY /S "%PATH_FROM%" "%PATH_TO%"

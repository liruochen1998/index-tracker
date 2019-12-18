read_file = open("public/companylist.csv", "r")
line = read_file.readline()
line = read_file.readline()
tickers = []
while line:
    tickers.append(line.split(',')[0].replace('"', ''))
    line = read_file.readline()
print(tickers)
write_file = open("public/tickers.txt", "w")
write_file.write(str(tickers))

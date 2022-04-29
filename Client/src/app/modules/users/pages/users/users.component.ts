import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface User {
    imageUrl: string,
    userName: string,
    email: string,
    createdOnDate: string,
    lastVisitDate: string
}

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    public users: any = [];
    public table = {
        displayedColumns: ['imageUrl', 'userName', 'email', 'createdOnDate', 'lastVisitDate'],
        dataSource: new MatTableDataSource<User>()
    }
    private authService: AuthService;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    ngOnInit(): void {
        this.authService.getAllUsers().subscribe((res) => {
            console.log("User", res);
            this.users = this.transformUsers(res);
            this.table.dataSource.data = res;
        })
        setTimeout(() => this.table.dataSource.paginator = this.paginator); // Workaround init after view
        // this.table.dataSource.paginator = this.paginator;
    }

    applyFilter(e: any) {
        const value = e.currentTarget.value.toLowerCase();
        this.table.dataSource.filter = value;
    }

    transformUsers(usersArr: any[]) {
        const len = usersArr.length;
        for (let i = 0; i < len; i++) {
            usersArr[i].createdOnDate = new Intl.DateTimeFormat("en-US", { 
                dateStyle: "medium", 
                timeStyle: "short",
                hour12: false
            }).format(new Date(usersArr[i].createdOnDate));
            usersArr[i].lastVisitDate = new Intl.DateTimeFormat("en-US", { 
                dateStyle: "medium", 
                timeStyle: "short",
                hour12: false
            }).format(new Date(usersArr[i].lastVisitDate));
        };
        return usersArr;
    }

}
